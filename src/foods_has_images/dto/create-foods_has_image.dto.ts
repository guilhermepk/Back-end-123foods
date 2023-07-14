import { IsNumber, IsOptional } from "class-validator";

export class CreateFoodsHasImageDto {
    @IsNumber()
    foodId: number;

    @IsNumber()
    imageId: number;
}
