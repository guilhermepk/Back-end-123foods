
import { Products } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToMany(() => Products, product => product.categories)
    @JoinTable({ name: 'category_products' }) // Nome personalizado da tabela intermediária
    products: Products[];

}
