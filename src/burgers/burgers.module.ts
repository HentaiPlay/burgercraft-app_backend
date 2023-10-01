import { Module } from '@nestjs/common';
import { BurgersService } from './burgers.service';
import { BurgersController } from './burgers.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BurgersController],
  providers: [BurgersService],
})
export class BurgersModule {}
