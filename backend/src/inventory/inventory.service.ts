import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // Get current inventory stats
  async getInventory(): Promise<Inventory> {
    let inventory = await this.inventoryRepository.findOne({ where: { id: 1 } });
    if (!inventory) {
      inventory = this.inventoryRepository.create({
        id: 1,
        totalValue: 0,
        productCount: 0,
      });
      await this.inventoryRepository.save(inventory);
    }
    return inventory;
  }

  // Update inventory stats
  async updateInventory(updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    let inventory = await this.getInventory();
    inventory.totalValue = updateInventoryDto.totalValue;
    inventory.productCount = updateInventoryDto.productCount;
    return await this.inventoryRepository.save(inventory);
  }

  // Calculate inventory from products (can be called after product changes)
  async recalculateInventory(products: any[]): Promise<Inventory> {
    const totalValue = products.reduce((sum, product) => sum + Number(product.price), 0);
    const productCount = products.length;
    
    return await this.updateInventory({ totalValue, productCount });
  }
}
