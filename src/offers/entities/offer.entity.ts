import { Categories } from 'src/categories/entities/categories.entity';
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

    @OneToMany( ()=> Categories, (categories) => categories.offer)
    categories: Categories[];
    
}
