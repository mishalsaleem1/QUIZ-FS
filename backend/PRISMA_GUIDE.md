# 🗄️ PRISMA SETUP GUIDE

## What is Prisma?

Prisma is a modern ORM (Object-Relational Mapping) that:
- ✅ Provides type-safe database access
- ✅ Auto-generates TypeScript types from schema
- ✅ Makes database queries easy and safe
- ✅ Works perfectly with NestJS

---

## 🎯 Your Database is Already Connected!

Your backend is configured to use:
- **Database:** Neon PostgreSQL (cloud)
- **Connection:** Already in `.env` file
- **ORM:** Prisma

**No additional setup needed!**

---

## 📋 Prisma Commands

### 1. Generate Prisma Client
```bash
npm run prisma:generate
```
This creates the Prisma Client with TypeScript types based on your schema.

### 2. Push Schema to Database
```bash
npm run prisma:push
```
This creates/updates tables in your Neon database based on `schema.prisma`.

### 3. Open Prisma Studio (Optional)
```bash
npm run prisma:studio
```
This opens a visual database browser at http://localhost:5555

---

## 📄 Your Prisma Schema

Located at `prisma/schema.prisma`:

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  image       String?  @db.VarChar(500)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("products")
}

model Inventory {
  id           Int      @id @default(autoincrement())
  totalValue   Decimal  @default(0) @db.Decimal(12, 2)
  productCount Int      @default(0)
  updatedAt    DateTime @updatedAt
  
  @@map("inventory")
}
```

This creates two tables:
- `products` - stores product information
- `inventory` - stores inventory statistics

---

## 🔧 How Prisma Works in Your Backend

### 1. Schema Definition (`prisma/schema.prisma`)
Defines your database structure

### 2. Prisma Client Generation
`npm run prisma:generate` creates TypeScript types

### 3. Prisma Service (`src/prisma/prisma.service.ts`)
Connects to database and provides Prisma Client

### 4. Services Use Prisma (`src/product/product.service.ts`)
```typescript
async create(createProductDto: CreateProductDto) {
  return await this.prisma.product.create({
    data: createProductDto,
  });
}
```

Type-safe, auto-completed queries!

---

## ✅ Checklist: First Time Setup

1. [ ] Install dependencies: `npm install`
2. [ ] Generate Prisma Client: `npm run prisma:generate`
3. [ ] Push schema to database: `npm run prisma:push`
4. [ ] Start backend: `npm run start:dev`

---

## 🎓 Advantages of Prisma

**vs TypeORM:**
- ✅ Better TypeScript support
- ✅ Auto-generated types
- ✅ Easier to learn
- ✅ More intuitive API
- ✅ Better error messages

**Perfect for your assignment because:**
- ✅ Modern and widely used
- ✅ Works great with Neon (cloud PostgreSQL)
- ✅ Type-safe (catches errors before runtime)
- ✅ Easy to demonstrate to your teacher

---

## 🆘 Troubleshooting

**Error: "Cannot find module '@prisma/client'"**
```bash
npm run prisma:generate
```

**Error: "Prisma schema not found"**
Make sure you're in the `backend/` folder

**Error: "Environment variable not found: DATABASE_URL"**
Check that `.env` file exists with `DATABASE_URL`

**Want to see your data visually?**
```bash
npm run prisma:studio
```
Opens at http://localhost:5555

---

## 🎉 You're All Set!

Your backend uses Prisma for:
- Type-safe database queries
- Auto-generated TypeScript types
- Easy CRUD operations
- Connection to Neon PostgreSQL

Just follow the 3-step setup and you're ready to submit!
