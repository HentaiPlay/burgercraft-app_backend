import { Injectable, OnModuleInit, OnModuleDestroy, } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
  
@Injectable()
export class PrismaService
extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
implements OnModuleInit, OnModuleDestroy {

    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}