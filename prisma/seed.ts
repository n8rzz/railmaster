import { PrismaClient } from '@prisma/client';
import { UserDto } from '../src/user/dto/user.dto';

const prisma = new PrismaClient();

async function createUsers(): Promise<{ bill: UserDto }> {
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

  return {
    bill,
  };
}

async function createGames(user: UserDto): Promise<void> {
  const game = await prisma.game.upsert({
    where: { id: user.id },
    update: {},
    create: {
      name: 'laughing-toad',
      userId: 1,
    },
  });

  console.log('');
  console.log('============= =============');
  console.log('');
  console.log('GAMES:\n', { game });
}

async function main(): Promise<void> {
  const { bill } = await createUsers();

  await Promise.all([createGames(bill)]);
}
main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
