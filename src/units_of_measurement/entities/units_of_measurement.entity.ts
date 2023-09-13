import { Products } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    
    OneToMany
   
  } from 'typeorm';
@Entity()
export class UnitsOfMeasurement {

    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => Products, (product) => product.units_of_measurements)
    products: Products[];

    @Column()
    name: string;
}
