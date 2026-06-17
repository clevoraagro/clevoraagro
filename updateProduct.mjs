import { PrismaClient } from './app/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.findFirst({
    where: { name: 'ff' }
  });

  if (product) {
    const updated = await prisma.product.update({
      where: { id: product.id },
      data: {
        name: 'GROW UP K',
        description: 'Potassium Thiosulphate 25K + 17S. Liquid Fertilizer designed for superior crop quality.',
      }
    });
    console.log('Product updated successfully:', updated);
  } else {
    console.log('Product with name "ff" not found.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
