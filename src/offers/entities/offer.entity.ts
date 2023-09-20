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
}
