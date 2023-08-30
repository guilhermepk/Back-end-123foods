import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  city: string;
  @Column()
  street: string;
  @Column()
  state: string;
  @Column()
  cep: string;
  @Column()
  numberhouse: string;
  @Column({ nullable: true })
  complement: string;
  @Column()
  district: string;
  @ManyToOne(() => Users, (user) => user.address)
  user: Users;
}
