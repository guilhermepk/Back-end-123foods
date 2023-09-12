import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  unit_of_measurement: import("/home/administrador/Documentos/GitHub/nestjs-typeorm-alura-lesson-2/src/units_of_meansurement/entities/units_of_meansurement.entity").UnitsOfMeansurement[];
}
