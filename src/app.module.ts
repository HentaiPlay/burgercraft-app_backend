import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { BurgersModule } from './burgers/burgers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    BurgersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
