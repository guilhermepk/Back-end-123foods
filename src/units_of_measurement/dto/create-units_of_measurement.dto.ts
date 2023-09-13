import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateUnitsOfMeasurementDto {
    @IsNotEmpty()
    name: string;
}
