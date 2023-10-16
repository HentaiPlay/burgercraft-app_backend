import { PrismaClient } from '@prisma/client';
import { SeederFactory } from './seeds/seeder.factory';

const prisma = new PrismaClient();

async function main() {
  const seeder = new SeederFactory(prisma)
  await seeder.run('roles')
  await seeder.run('users')
  await seeder.run('products')
  await seeder.run('orders')
  await seeder.run('stats')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });