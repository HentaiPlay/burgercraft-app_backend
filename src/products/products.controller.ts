import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductParamDto } from './dto/product-param.dto';
import { Roles } from 'src/utilities/decorators/roles';
import { Role } from 'src/roles/types/roles.types';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductPhoto } from 'src/utilities/decorators/product';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFileInterceptorOptions } from 'src/utilities/interceptors/images.interceptor';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploadPhotoDto } from './dto/upload-photo.dto';

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

  @ApiOperation({ summary: 'Создание продукта' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  @HttpCode(201)
  async createProduct (@Body() productDto: CreateProductDto) {
    await this.productsService.createProduct(productDto)
  }

  @ApiOperation({ summary: 'Редактирование продукта' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch()
  async updateProduct (@Body() productDto: UpdateProductDto) {
    await this.productsService.updateProduct(productDto)
  }

  @ApiOperation({ summary: 'Загрузка фото продукта' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Put('photo')
  @UseInterceptors(FileInterceptor('file', ProductFileInterceptorOptions))
  async uploadPhoto (@ProductPhoto() product: UploadPhotoDto) {
    await this.productsService.uploadPhoto(product)
  }
}
