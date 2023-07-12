import { Foods } from "src/foods/entities/foods.entity";
import { Images } from "src/images/entities/images.entity";

export class CreateFoodsHasImageDto {
    food: Foods;
    image: Images;
}
