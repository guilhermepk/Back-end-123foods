import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Food } from '../../foods//entities/food.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => User, user => user.cart)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Food, food => food.cart)
    food: Food;
}
