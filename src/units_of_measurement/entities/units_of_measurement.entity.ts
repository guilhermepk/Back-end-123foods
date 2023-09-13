import { Products } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
   
  } from 'typeorm';
@Entity()
export class UnitsOfMeasurement {

    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => Products, (product) => product.unit_of_measurement)
    product: Products;

    @Column()
    name: string;
  static product: any;
}
