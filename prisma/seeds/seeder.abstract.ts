import { PrismaClient } from "@prisma/client";

export abstract class Seeder {
  constructor (readonly prisma: PrismaClient) {}
  abstract run(): void
}
