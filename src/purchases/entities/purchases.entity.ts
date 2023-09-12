import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Products } from '../../products/entities/products.entity';
import { Images } from 'src/images/entities/images.entity';


@Entity()
export class Purchases {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ default: 'previsto' }) 
  status: string;


  @ManyToOne(() => Users, (user) => user.purchases)
  user: Users;

  @ManyToOne(() => Images, (images) => images.purchases)
  image: Images;
  @ManyToOne(() => Products, (products) => products.purchases)
  product: Products;

  @Column()
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
