import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany } from 'typeorm';
@Entity()
export class Banners {
@PrimaryGeneratedColumn()
  id: number;
  @Column()
  image:string;
  @Column()
  alt:string;
  @Column()
  link:string;


}
