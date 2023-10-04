import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { BurgerIngredientDto } from './dto/burger-ingredients.dto';
import { Brioche, ProductTypes } from 'src/products/types/products.types';
import { Burger } from './types/burgers.types';
import { UpdateBurgerDto } from './dto/update-burger.dto';
import { difference } from 'lodash'

@Injectable()
export class BurgersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const burgerData = await this.prisma.burger.findFirst({
      where: { id },
      select: {
        price: true,
        burgerIngredient: {
          select: {
            ingredientId: true
          }
        }
      }
    })
    const ingredientsId = burgerData.burgerIngredient.map(item => item.ingredientId)
    const ingredients = await this.prisma.product.findMany({
      where: {
        id: { in: ingredientsId },
        type: ProductTypes.burgerIngredient
      }
    })
    
    const burger: Burger = { price: burgerData.price, ingredients: ingredients }
    return burger
  }

  async createBurger(burgerDto: CreateBurgerDto) {
    const hasBrioches = this.checkBriochesIntoIngredients(burgerDto.ingredients);
    if (!hasBrioches) throw new HttpException('В бургере нет булочек', HttpStatus.BAD_REQUEST);

    const price = await this.countPrice(burgerDto.ingredients);
    const burger = await this.prisma.burger.create({ data: { price: price } });
    await this.createBurgerIngredients(burger.id, burgerDto.ingredients)
  }

  async updateBurger (burgerDto: UpdateBurgerDto) {
    const burger = await this.findById(burgerDto.id)
    if (!burger) throw new HttpException('Бургер не существует', HttpStatus.BAD_REQUEST);

    const oldIngredients = burger.ingredients.map(ingredient => ingredient.id)
    const newIngredients = burgerDto.ingredients.map(ingredient => ingredient.id)
    const hasChangesIngredients = difference(oldIngredients, newIngredients)

    if (hasChangesIngredients) {
      const hasBrioches = this.checkBriochesIntoIngredients(burgerDto.ingredients);
      if (!hasBrioches) throw new HttpException('В бургере нет булочек', HttpStatus.BAD_REQUEST);

      await this.prisma.burgerIngredient.deleteMany({ where: { burgerId: burgerDto.id } })
      await this.createBurgerIngredients(burgerDto.id, burgerDto.ingredients)
    }

    const price = await this.countPrice(burgerDto.ingredients);
    await this.prisma.burger.update({
      where: { id: burgerDto.id },
      data: { price: price }
    });
  }

  async deleteBurger(id: number) {
    await this.prisma.burger.delete({ where: { id } });
  }

  private async createBurgerIngredients (burgerId: number, ingredients: Array<BurgerIngredientDto>) {
    const burgerIngredientsData = [];
    ingredients.forEach((ingredient) =>
      burgerIngredientsData.push({
        burgerId: burgerId,
        ingredientId: ingredient.id,
      }),
    );
    await this.prisma.burgerIngredient.createMany({
      data: burgerIngredientsData,
    });
  }

  private async countPrice(ingredients: Array<BurgerIngredientDto>) {
    let totalPrice = 0;
    const productsId = ingredients.map((ingredient) => ingredient.id);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productsId } },
      select: { price: true },
    });
    products.forEach((product) => (totalPrice += product.price));
    return totalPrice;
  }

  private checkBriochesIntoIngredients(ingredients: Array<BurgerIngredientDto>): Boolean {
    const brioche = { up: false, down: false };
    ingredients.forEach((ingredient) => {
      if (ingredient.slug === Brioche.up) { brioche.up = true; }
      if (ingredient.slug === Brioche.down) { brioche.down = true; }
    });
    return brioche.up && brioche.down;
  }
}
