import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = [
  "Engineering",
  "Developers",
  "Business",
  "Design",
  "Content",
];

function returnRandomItem(item: string[]) {
  const randomIndex = Math.floor(Math.random() * item.length);
  return item[randomIndex];
}

async function main() {
  await prisma.user.deleteMany();

  console.log("db cleared");

  const hashedPassword = await bcrypt.hash("!123qweASD", 12);

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        image: faker.image.avatar(),
        is_verified: true,
      },
    });

    console.log(`User ${i} created`);

    await prisma.profile.create({
      data: {
        userId: user.id,
        first_name: user.name?.split(" ")[0] || faker.person.firstName(),
        last_name: user.name?.split(" ")[1] || faker.person.lastName(),
        user_name: faker.internet.userName(),
      },
    });

    console.log(`Profile for user ${i} created`);
  }
  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
