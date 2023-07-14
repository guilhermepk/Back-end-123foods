import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Foods } from '../../foods/entities/foods.entity';

@Entity()
export class Purchases {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.purchases)
    user: Users
    @ManyToOne(() => Foods, (food) => food.purchases)
    food: Foods
    @Column()
    amount: number;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}
