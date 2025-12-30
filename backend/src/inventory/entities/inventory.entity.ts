import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 12, scale: 2 })
  totalValue: number;

  @Column()
  productCount: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
