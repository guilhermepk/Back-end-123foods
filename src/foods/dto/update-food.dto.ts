import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  name: string;
  brand: string;
  weight: number;
  unit_of_measurement: string;
  category: string;
  qtd: number;
  description: string;
  price: number;
}
