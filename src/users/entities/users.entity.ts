import { Purchases } from 'src/purchases/entities/purchases.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false,nullable:true })
  admin: boolean;
  @Column()
  name: string;
  @Column()
  date_of_birth?: string;
  @Column()
  gender: string;
  @Column()
  cpf: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  image: string;

  @OneToMany(() => Purchases, (purchase) => purchase.user)
  purchases: Purchases[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
