import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { BurgerIngredientDto } from './dto/burger-ingredients.dto';
import { Brioche, ProductTypes } from 'src/products/types/products.types';
import { Burger } from './types/burgers.types';

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

    const burgerIngredientsData = [];
    burgerDto.ingredients.forEach((ingredient) =>
      burgerIngredientsData.push({
        burgerId: burger.id,
        ingredientId: ingredient.id,
      }),
    );
    await this.prisma.burgerIngredient.createMany({
      data: burgerIngredientsData,
    });
  }

  async deleteBurger(id: number) {
    await this.prisma.burger.delete({ where: { id } });
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
