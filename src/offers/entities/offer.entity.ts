import { Categories } from 'src/categories/entities/category.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    
    OneToMany
   
  } from 'typeorm';
@Entity()
export class Offers {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    offer:number;

    @OneToMany( ()=> Categories, (category) => category.offer)
    categories: Categories[];
    
}
