
import { Offers } from 'src/offers/entities/offer.entity';
import { Products } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToOne(() =>Offers, (offer) => offer.categories)
    offer: Offers;
    @ManyToMany(() => Products, product => product.categories)
    @JoinTable({ name: 'category_products' }) // Nome personalizado da tabela intermediária
    products: Products[];

}
