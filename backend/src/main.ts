import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for production deployment
  app.enableCors({
    origin: ['http://localhost:3000', 'https://quiz-fs-two.vercel.app'], // Allow localhost and Vercel domains
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  
  // Enable validation for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📊 Connected to Neon PostgreSQL with Prisma`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET    /products`);
  console.log(`   - POST   /products`);
  console.log(`   - GET    /products/:id`);
  console.log(`   - PUT    /products/:id`);
  console.log(`   - DELETE /products/:id`);
  console.log(`   - GET    /inventory`);
  console.log(`   - PUT    /inventory`);
}

bootstrap();
