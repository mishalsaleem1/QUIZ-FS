import { Controller, Get, Put, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // GET /inventory - Get current inventory stats
  @Get()
  async getInventory(): Promise<Inventory> {
    return await this.inventoryService.getInventory();
  }

  // PUT /inventory - Update inventory stats
  @Put()
  async updateInventory(@Body() updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    return await this.inventoryService.updateInventory(updateInventoryDto);
  }
}
