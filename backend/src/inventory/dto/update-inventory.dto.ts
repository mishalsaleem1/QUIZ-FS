import { IsNumber, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @Min(0)
  totalValue: number;

  @IsNumber()
  @Min(0)
  productCount: number;
}
