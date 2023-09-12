import { Products } from 'src/products/entities/products.entity';
import { Purchases } from 'src/purchases/entities/purchases.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  
  @OneToMany(() => Purchases, (purchase) => purchase.image)
  purchases: Purchases[];

  @ManyToOne(() => Products, (product) => product.images)
  product: Products;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
