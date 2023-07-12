import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Images } from "src/images/entities/images.entity";

export class CreateFoodDto{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    brand: string;

    @IsNumber()
    weight: number;

    @IsNotEmpty()
    unit_of_measurement: string;

    @IsNotEmpty()
    category: string;

    @IsNumber()
    qtd: number;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;
    
    // @IsArray()
    // images: Array<Images>
}