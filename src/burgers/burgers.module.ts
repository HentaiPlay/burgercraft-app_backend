import { Module } from '@nestjs/common';
import { BurgersService } from './burgers.service';
import { BurgersController } from './burgers.controller';

@Module({
  controllers: [BurgersController],
  providers: [BurgersService]
})
export class BurgersModule {}
