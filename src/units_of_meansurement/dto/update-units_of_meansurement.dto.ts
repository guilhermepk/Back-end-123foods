import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitsOfMeansurementDto } from './create-units_of_meansurement.dto';

export class UpdateUnitsOfMeansurementDto extends PartialType(CreateUnitsOfMeansurementDto) {}
