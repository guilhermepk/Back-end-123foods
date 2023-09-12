import { Products } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
   
  } from 'typeorm';
@Entity()
export class UnitsOfMeansurement {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Products, (product) => product.unit_of_measurement)
product: Products;

    @Column()
    name: string;
  static product: any;
}
