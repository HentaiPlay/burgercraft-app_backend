import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ProductController')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получение всех продуктов' })
  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }
}
