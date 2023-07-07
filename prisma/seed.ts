import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../src/domain/user/dto/user.dto';

const prisma = new PrismaClient();

async function createUsers(): Promise<{ bill: UserDto }> {
  const plaintextPwd = 'shark1';
  const hashedPwd = await bcrypt.hash(plaintextPwd, 10);
  const bill = await prisma.user.upsert({
    where: { email: 'bill.murray@example.com' },
    update: {},
    create: {
      email: 'bill.murray@example.com',
      password: hashedPwd,
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
      userId: user.id,
    },
  });

  console.log('');
  console.log('============= =============');
  console.log('');
  console.log('GAMES:\n', { game });
}

async function createRailcars(user: UserDto): Promise<void> {
  const railcar = await prisma.railcar.upsert({
    where: { id: user.id },
    update: {},
    create: {
      capacity_unit: 'gal',
      capacity_value: 250000,
      type: 'tank',
      userId: user.id,
    },
  });

  console.log('');
  console.log('============= =============');
  console.log('');
  console.log('RAILCARS:\n', { railcar });
}

async function createEngines(user: UserDto): Promise<void> {
  const engine = await prisma.engine.upsert({
    where: { id: user.id },
    update: {},
    create: {
      fuelEfficiency: 10,
      power: 4000,
      status: 'active',
      type: 'Diesel/Electric',
      userId: user.id,
    },
  });

  console.log('');
  console.log('============= =============');
  console.log('');
  console.log('ENGINES:\n', { engine });
}

async function main(): Promise<void> {
  const { bill } = await createUsers();

  await Promise.all([createGames(bill), createRailcars(bill), createEngines(bill)]);
}
main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
