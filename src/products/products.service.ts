import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductType } from 'src/utilities/types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.product.findFirst({
      where: { id },
    });
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
}
