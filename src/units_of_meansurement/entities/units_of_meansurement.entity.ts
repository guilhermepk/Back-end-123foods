import { Foods } from 'src/foods/entities/foods.entity';
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
    @ManyToOne(() => Foods, (food) => food.unit_of_measurement)
food: Foods;

    @Column()
    name: string;
  static food: any;
}
