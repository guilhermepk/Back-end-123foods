import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
 @IsNumber()
  price:number;
}
