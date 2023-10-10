import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash'
import * as fs from 'fs';
import { PrismaService } from 'prisma/prisma.service';
import { ProductType } from './types/products.types';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { generateSlug } from 'src/utilities/helpers/slug-generator';
import { UploadPhotoDto } from './dto/upload-photo.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findById (id: number) {
    return await this.prisma.product.findFirst({
      where: { id }
    })
  }

  async findByName (name: string) {
    return await this.prisma.product.findUnique({
      where: { name }
    })
  }

  async findAllByType(type: ProductType) {
    return await this.prisma.product.findMany({
      select: {
        name: true,
        price: true,
      },
      where: { type: type },
    });
  }

  async getAll() {
    return await this.prisma.product.findMany();
  }

  async createProduct(product: CreateProductDto) {
    const existProduct = await this.findByName(product.name)
    if (existProduct) {
      throw new HttpException(
        'Продукт с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = cloneDeep(product)
    data.slug = generateSlug(product.name)
    await this.prisma.product.create({ data: data })
  }

  async updateProduct(productData: UpdateProductDto) {
    const oldProduct = await this.findById(productData.id)
    if (productData.name) {
      // если изменено название, то меняется slug и название картинки (если она есть)
      if (oldProduct.name !== productData.name) {
        productData.slug = generateSlug(productData.name)
        if (oldProduct.photoPath !== 'no_image.jpg') {
          const ext = oldProduct.photoPath.split('.').pop()
          const newPhotoPath = `products/${oldProduct.type}s/${productData.slug}.${ext}`
          await this.renamePhoto(oldProduct.photoPath, newPhotoPath)
        }
      }      
    }

    await this.prisma.product.update({
      where: { id: productData.id },
      data: productData
    })
  }

  async uploadPhoto (uploadPhotoData: UploadPhotoDto) {
    const product = await this.findByName(uploadPhotoData.name)
    if (product) {
      await this.removePhoto(product.id)
      const photoPath = `products/${product.type}s/${uploadPhotoData.fileName}`
      await this.updateProduct({
        id: product.id,
        photoPath: photoPath
      });
    } else {
      // TODO: вынести проверку на уровень interceptor-a
      // так как картинка загружается в любом случае, удаляем обратно
      const path = `files/images/static/products/${uploadPhotoData.type}s/${uploadPhotoData.fileName}`
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
    }
  }

  async renamePhoto (oldName: string, newName: string) {
    const prefixPath = 'files/images/static/'
    const oldPath = prefixPath + oldName
    const newPath = prefixPath + newName
    fs.rename(oldPath, newPath, e => { if (e) { console.log(e) } })
  }

  async removePhoto(id: number) {
    const product = await this.findById(id);
    const defaultPhoto = 'no_image.jpg';
    if (product.photoPath !== defaultPhoto) {
      fs.unlinkSync(`files/images/static/${product.photoPath}`);
    }
  }
}
