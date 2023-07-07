
import { Carts } from 'src/carts/entities/carts.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany } from 'typeorm';
@Entity()
export class Foods {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column({ type: 'numeric'})
  weight:number;
  @Column()
  unit_of_measurement: string;
  @Column()
  category: string;
  @Column()
  qtd: number;
  @Column()
  description: string;
  @Column({ type: 'numeric'})
  price: Number;
  @ManyToMany(() => Carts, cart => cart.foodIds)
  cart: Carts;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}