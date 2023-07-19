import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFoodDto{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    brand: string;

    @IsNumber()
    @IsOptional()
    weight: number = 0;

    @IsNotEmpty()
    unit_of_measurement: string;

    @IsNotEmpty()
    category: string;

    @IsOptional()
    @IsNumber()
    amount: number = 0;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsNumber()
    price: number = 0;
}