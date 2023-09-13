import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitsOfMeasurementDto } from './create-units_of_measurement.dto';

export class UpdateUnitsOfMeasurementDto extends PartialType(CreateUnitsOfMeasurementDto) {}
