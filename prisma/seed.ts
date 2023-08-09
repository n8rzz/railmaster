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

  return [game];
}

async function createRailcars(user: UserDto): Promise<Railcar[]> {
  const railcars = [];
  const railcarCount = 10;

  for (let i = 0; i < railcarCount; i++) {
    const isOdd = i % 2 === 0;
    const capacityUnit = isOdd ? 'gal' : 'lbs';
    const capacityValue = Math.max(i * 10000, 50000);
    const type = isOdd ? 'tank' : 'boxcar';

    const createdRailcar = await prisma.railcar.upsert({
      where: { id: user.id },
      update: {},
      create: {
        capacity_unit: capacityUnit,
        capacity_value: capacityValue,
        type: type,
        userId: user.id,
      },
    });

    railcars.push(createdRailcar);
    process.stdout.write('.');
  }

  return railcars;
}

async function createEngines(user: UserDto): Promise<Engine[]> {
  const engines = [];
  const engineCount = 10;

  for (let i = 0; i < engineCount; i++) {
    const createdEngine = await prisma.engine.upsert({
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

    engines.push(createdEngine);
    process.stdout.write('.');
  }

  return engines;
}

async function createTrains(bill: User, railcars: Railcar[], engines: Engine[]): Promise<Train[]> {
  const trains = [];
  const train = await prisma.train.upsert({
    where: { id: bill.id },
    update: {},
    create: {
      capacity: 100,
      maxSpeed: 80,
      status: 'parked',
    },
  });

  trains.push(train);
  process.stdout.write('.');

  return trains;
}

async function main(): Promise<void> {
  const users = await createUsers();

  const [_, railcars, engines] = await Promise.all([
    createGames(users.bill),
    createRailcars(users.bill),
    createEngines(users.bill),
  ]);
  const trains = await createTrains(users.bill, railcars, engines);

  console.log('');
  console.log('\n=====================================');
  console.log('Created Seeds:');
  console.log(`- Users: ${Object.keys(users).length}`);
  console.log(`- Railcars: ${railcars.length}`);
  console.log(`- Engines: ${engines.length}`);
  console.log(`- Trains: ${trains.length}`);
  console.log('=====================================\n');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
