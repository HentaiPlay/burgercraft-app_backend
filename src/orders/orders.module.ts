import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { BurgersModule } from 'src/burgers/burgers.module';
import { ProductsModule } from 'src/products/products.module';
import { StatsModule } from 'src/stats/stats.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => BurgersModule),
    ProductsModule,
    StatsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
