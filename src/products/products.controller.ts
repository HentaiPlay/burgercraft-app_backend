import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('ProductController')
@UseGuards(JWTAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Получение всех продуктов' })
  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }
}
