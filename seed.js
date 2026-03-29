const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const bouquetsData = JSON.parse(fs.readFileSync('./data/bouquets.json', 'utf8'));
  const categoriesData = JSON.parse(fs.readFileSync('./data/categories.json', 'utf8'));

  // Clear existing
  await prisma.bouquet.deleteMany({});
  await prisma.category.deleteMany({});

  // Insert categories
  console.log('Inserting categories...');
  for (const catName of categoriesData) {
    if (typeof catName === 'string') {
      try {
        await prisma.category.create({ data: { name: catName } });
      } catch (e) {
        console.error('Failed to insert cat:', catName, e.message);
      }
    }
  }

  // Insert bouquets
  console.log('Inserting bouquets...');
  for (const b of bouquetsData) {
    try {
      await prisma.bouquet.create({
        data: {
          name: b.name,
          description: b.description || '',
          price: b.price || 0,
          images: b.images || [],
          stock: b.stock || 0,
          isFeatured: !!b.isFeatured,
          category: b.category || 'Uncategorized'
        }
      });
    } catch (e) {
       console.error('Failed to insert bouquet:', b.name, e.message);
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
