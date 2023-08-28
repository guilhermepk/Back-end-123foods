import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Banners {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  alt: string;

  @Column({ nullable: true })
  link: string;
}
