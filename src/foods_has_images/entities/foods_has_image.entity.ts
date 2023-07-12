import { Foods } from "src/foods/entities/foods.entity";
import { Images } from "src/images/entities/images.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FoodsHasImages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Foods, (food) => food.foods_has_images)
    food: Foods
    @ManyToOne(() => Images, (image) => image.foods_has_images)
    image: Images
}
