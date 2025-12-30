import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Product } from './product/entities/product.entity';

async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Product],
    synchronize: true,
  });

  const productRepo = connection.getRepository(Product);

  const products = [
    {
      name: 'Lamp',
      description: 'A bright lamp',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chair',
      description: 'Comfortable chair',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Table',
      description: 'Wooden table',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
  ];

  for (const data of products) {
    const product = productRepo.create(data);
    await productRepo.save(product);
    console.log(`Seeded: ${product.name}`);
  }

  console.log('All products seeded!');
  await connection.close();
}

seed().catch((err) => {
  console.error('Error seeding products:', err);
});
