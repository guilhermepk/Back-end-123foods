import { Foods } from "src/foods/entities/foods.entity";
import { Images } from "src/images/entities/images.entity";
import { IsNumber, IsOptional } from "class-validator";

export class CreateFoodsHasImageDto {
    @IsNumber()
    foodId: number;

    @IsNumber()
    imageId: number;
}
