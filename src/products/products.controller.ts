import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductParamDto } from './dto/product-param.dto';

@ApiTags('ProductController')
@UseGuards(JWTAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получение продуктов по типу' })
  @Get(':type')
  getProductsByType(@Param() ParamDto: ProductParamDto) {
    return this.productsService.findAllByType(ParamDto.type);
  }

  @ApiOperation({ summary: 'Получение всех продуктов' })
  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }
}
