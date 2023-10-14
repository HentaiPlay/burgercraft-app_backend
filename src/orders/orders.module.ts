import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { BurgersModule } from 'src/burgers/burgers.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => BurgersModule),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
