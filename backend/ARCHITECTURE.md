# 📊 BACKEND ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    NESTJS BACKEND SERVER                     │
│                   http://localhost:3001                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        │            APP MODULE                     │
        │         (app.module.ts)                   │
        │                                           │
        │  - Configures PostgreSQL connection       │
        │  - Imports Product & Inventory modules    │
        │                                           │
        └─────────────────────┬─────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                │                           │
    ┌───────────▼──────────┐    ┌──────────▼───────────┐
    │   PRODUCT MODULE     │    │  INVENTORY MODULE    │
    │ (product.module.ts)  │    │(inventory.module.ts) │
    └──────────────────────┘    └──────────────────────┘
                │                           │
                │                           │
    ┌───────────▼──────────┐    ┌──────────▼───────────┐
    │ PRODUCT CONTROLLER   │    │ INVENTORY CONTROLLER │
    │(product.controller)  │    │(inventory.controller)│
    │                      │    │                      │
    │ Routes:              │    │ Routes:              │
    │ GET    /products     │    │ GET  /inventory      │
    │ POST   /products     │    │ PUT  /inventory      │
    │ GET    /products/:id │    │                      │
    │ PUT    /products/:id │    └──────────┬───────────┘
    │ DELETE /products/:id │               │
    └──────────┬───────────┘               │
               │                           │
    ┌──────────▼───────────┐    ┌─────────▼────────────┐
    │  PRODUCT SERVICE     │    │ INVENTORY SERVICE    │
    │ (product.service.ts) │    │(inventory.service)   │
    │                      │    │                      │
    │ Business Logic:      │    │ Business Logic:      │
    │ - create()           │    │ - getInventory()     │
    │ - findAll()          │    │ - updateInventory()  │
    │ - findOne()          │    │ - recalculate()      │
    │ - update()           │    │                      │
    │ - remove()           │    └──────────┬───────────┘
    └──────────┬───────────┘               │
               │                           │
    ┌──────────▼───────────┐    ┌─────────▼────────────┐
    │   PRODUCT ENTITY     │    │  INVENTORY ENTITY    │
    │ (product.entity.ts)  │    │(inventory.entity.ts) │
    │                      │    │                      │
    │ Database Model:      │    │ Database Model:      │
    │ - id                 │    │ - id                 │
    │ - name               │    │ - totalValue         │
    │ - description        │    │ - productCount       │
    │ - price              │    │ - updatedAt          │
    │ - image              │    │                      │
    │ - createdAt          │    └──────────┬───────────┘
    │ - updatedAt          │               │
    └──────────┬───────────┘               │
               │                           │
               └──────────┬────────────────┘
                          │
                          │
              ┌───────────▼───────────┐
              │   CLOUD POSTGRESQL    │
              │   (Neon / Supabase)   │
              │                       │
              │  Tables:              │
              │  - products           │
              │  - inventory          │
              └───────────────────────┘
```

---

## 🔄 How It Works

1. **Client** sends HTTP request → `http://localhost:3001/products`

2. **Controller** receives request → Routes to appropriate method

3. **Service** processes business logic → Interacts with database

4. **Entity** defines table structure → TypeORM creates/manages tables

5. **Database** stores/retrieves data → Cloud PostgreSQL

6. **Response** sent back through same path

---

## 📁 File Organization

```
backend/src/
│
├── product/                    # Everything about Products
│   ├── entities/
│   │   └── product.entity.ts   # Database table definition
│   ├── dto/                    # Data transfer objects
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── product.controller.ts   # API endpoints (routes)
│   ├── product.service.ts      # Business logic
│   └── product.module.ts       # Bundles it all together
│
├── inventory/                  # Everything about Inventory
│   ├── entities/
│   │   └── inventory.entity.ts
│   ├── dto/
│   │   └── update-inventory.dto.ts
│   ├── inventory.controller.ts
│   ├── inventory.service.ts
│   └── inventory.module.ts
│
├── app.module.ts              # Main module (imports all)
└── main.ts                    # Application entry point
```

---

## 🎓 Key Terms Explained

**Module** = Container that organizes related components
- Think of it as a folder that groups related files
- Example: Product Module contains everything about products

**Controller** = Handles HTTP requests (API routes)
- Defines endpoints like GET /products, POST /products
- Routes requests to appropriate service methods

**Service** = Business logic layer
- Does the actual work (create, read, update, delete)
- Interacts with the database
- Can be reused by different controllers

**Entity** = Database model (table definition)
- Defines table structure in PostgreSQL
- Uses decorators to specify columns, types, constraints
- TypeORM converts this to actual SQL tables

**DTO** = Data Transfer Object
- Defines what data can be sent in requests
- Validates input data
- Example: CreateProductDto ensures required fields are present

---

## 🔗 Request Flow Example

**User wants to create a product:**

```
POST /products
Body: { name: "Laptop", price: 999.99, ... }
         │
         ▼
ProductController.create()  ← Receives HTTP request
         │
         ▼
ProductService.create()     ← Processes business logic
         │
         ▼
ProductRepository.save()    ← Saves to database
         │
         ▼
PostgreSQL Database         ← Data stored
         │
         ▼
Return saved product        ← Response sent back
```

---

This architecture follows **NestJS best practices** and ensures:
✅ Separation of concerns
✅ Easy to test
✅ Easy to maintain
✅ Scalable structure
