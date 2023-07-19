
import { FoodsHasImages } from 'src/foods_has_images/entities/foods_has_image.entity';
import { Images } from 'src/images/entities/images.entity';
import { Purchases } from 'src/purchases/entities/purchases.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable } from 'typeorm';
@Entity()
export class Foods {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column({ type: 'numeric'})
  weight: number;
  @Column()
  unit_of_measurement: string;
  @Column()
  category: string;
  @Column()
  qtd: number;
  @Column()
  description: string;
  @Column({ type: 'numeric'})
  price: number;

  @OneToMany(() => Purchases, (purchase) => purchase.food)
  purchases: Purchases[]
  @OneToMany(() => FoodsHasImages, (foods_has_images) => foods_has_images.food)
  foods_has_images: FoodsHasImages[]

  // @ManyToMany(() => Images)
  // @JoinTable()
  // images: Images[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}