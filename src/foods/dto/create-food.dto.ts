import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    
    
}