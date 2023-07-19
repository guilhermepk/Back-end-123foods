
import { FoodsHasImages } from 'src/foods_has_images/entities/foods_has_image.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;

  @OneToMany(() => FoodsHasImages, (foods_has_images) => foods_has_images.image)
  foods_has_images: FoodsHasImages[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
