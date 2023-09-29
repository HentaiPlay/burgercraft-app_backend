import { PrismaClient } from "@prisma/client";

abstract class Seeder {
  constructor (readonly prisma: PrismaClient) {}
  abstract run(): void
}

export { Seeder }
