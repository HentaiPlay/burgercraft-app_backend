import { Module, forwardRef } from '@nestjs/common';
import { BurgersService } from './burgers.service';
import { BurgersController } from './burgers.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => OrdersModule)
  ],
  controllers: [BurgersController],
  providers: [BurgersService],
  exports: [BurgersService]
})
export class BurgersModule {}
