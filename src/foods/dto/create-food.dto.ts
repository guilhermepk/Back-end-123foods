import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { isFloat32Array } from "util/types";
export class CreateFoodDto{
    
    @IsString()
    name:string;
    
    @IsNotEmpty()
    description:string;


    @IsNumber()
    price: number;
}