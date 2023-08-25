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
  @Column({nullable:true})
  complement: string;
  @Column()
  district: string;
  @Column()
  userId: number;
}
