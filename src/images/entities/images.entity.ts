import { Foods } from 'src/foods/entities/foods.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;

  @ManyToOne(() => Foods, (food) => food.images)
  food: Foods;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
