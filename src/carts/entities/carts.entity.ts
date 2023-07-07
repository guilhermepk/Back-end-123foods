import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Foods } from '../../foods/entities/foods.entity';

@Entity()
export class Carts {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => Users, user => user.cart)
    userId: number;
    @ManyToMany(() => Foods, food => food.cart)
    // @JoinColumn()
    foodIds: number[];
}
