import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // Neon DB connection string
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Set to false in production
};
