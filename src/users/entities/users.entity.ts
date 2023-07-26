
import { Purchases } from 'src/purchases/entities/purchases.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  admin: boolean;
  @Column()
  name: string;
  @Column()
  date_of_birth?:string;
  @Column()
  gender:string;
  @Column()
  cpf:string;
  @Column()
  phone:string;
  @Column()
  email:string;
  @Column()
  password:string;
  @Column()
  city:string;
  @Column()
  street:string;
  @Column()
  state:string;
  @Column()
  cep:string;
  @Column()
<<<<<<< HEAD
  numberhouse:string;
  @Column()
  image:string;
=======
  image?:string;
>>>>>>> parent of a3d4fcb (Merge branch 'main' into criando-envio-de-imagens-nos-produtos)

  @OneToMany(() => Purchases, (purchase) => purchase.user)
  purchases: Purchases[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}