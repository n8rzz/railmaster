import { Engine, Game, PrismaClient, Railcar, Train, User } from '@prisma/client';
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

async function createGames(user: UserDto): Promise<Game[]> {
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
  console.log('GAMES:\n', game);

  return [game];
}

async function createRailcars(user: UserDto): Promise<Railcar[]> {
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
  console.log('RAILCARS:\n', railcar);

  return [railcar];
}

async function createEngines(user: UserDto): Promise<Engine[]> {
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
  console.log('ENGINES:\n', engine);

  return [engine];
}
async function createTrains(bill: User, railcars: Railcar[], engines: Engine[]): Promise<Train[]> {
  const train = await prisma.train.upsert({
    where: { id: bill.id },
    update: {},
    create: {
      capacity: 100,
      maxSpeed: 80,
      status: 'parked',
    },
  });

  console.log('');
  console.log('============= =============');
  console.log('');
  console.log('TRAINS:\n', train);

  return [train];
}

async function main(): Promise<void> {
  const { bill } = await createUsers();

  const [_, railcars, engines] = await Promise.all([
    createGames(bill),
    createRailcars(bill),
    createEngines(bill),
  ]);
  await createTrains(bill, railcars, engines);
}
main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
