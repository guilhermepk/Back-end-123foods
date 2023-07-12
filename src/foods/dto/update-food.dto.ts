import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { Images } from 'src/images/entities/images.entity';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  name: string;
  brand: string;
  weight: number;
  unit_of_measurement: string;
  category: string;
  qtd: number;
  description: string;
  price: number;
  // images: Images[];
}
