import { PrismaClient } from '@prisma/client';
import { SeederFactory } from './seeds/seeder.factory';

const prisma = new PrismaClient();

async function main() {

  const seeder = new SeederFactory(prisma)
  await seeder.run('roles')

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });