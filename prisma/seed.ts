import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers(): Promise<void> {
  const bill = await prisma.user.upsert({
    where: { email: 'bill.murray@example.com' },
    update: {},
    create: {
      email: 'bill.murray@example.com',
      password: 'shark1',
      username: 'bill.murray',
    },
  });

  console.log('Users:\n', bill);
}

async function createGames(): Promise<void> {
  const game = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'laughing-toad',
    },
  });

  console.log('GAMES:\n', { game });
}

async function main(): Promise<void> {
  await createUsers();

  await Promise.all([createGames()]);
}
main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
