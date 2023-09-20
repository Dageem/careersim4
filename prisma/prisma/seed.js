const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 5;


async function main() {
  const hashPassword= await bcrypt.hash("test", saltRounds)
  
  const alice = await prisma.user.create({
    data: {
      username: "Alice Moneybag",
      password: hashPassword,
      Post: {
        create: [
            {
              title: "Carrot",
              content: "I Love Carrot Juice",
            },
            {
              title: "Pineapple",
              content: "I Love Pineapple Juice",
            },
            {
              title: "Papaya",
              content: "I love Papaya Juice",
            },
          ],
        },
      },
    });

  const bob = await prisma.user.create({
    data: {
      username: "Bob Billy",
      password: hashPassword,
      Post: {
        create: [
          {
            title: "Apple",
            content: "I Love Apple Juice",
          },
          {
            title: "Grape",
            content: "I Love Grape Juice",
          },
          {
            title: "Orange",
            content: "I love Orange Juice",
          },
        ],
      },
    },
  });
  const Ray = await prisma.user.create({
    data: {
      username: "Ray The Man",
      password: hashPassword,
      Post: {
        create: [
            {
              title: "Amla",
              content: "I Love Amla Juice",
            },
            {
              title: "Watermelon",
              content: "I Love Watermelon Juice",
            },
            {
              title: "Avocado",
              content: "I love Avocado Juice",
            },
          ],
        },
      },
    });
  console.log({ alice, bob, Ray });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
