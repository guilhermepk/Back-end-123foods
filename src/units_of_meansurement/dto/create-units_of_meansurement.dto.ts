import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateUnitsOfMeansurementDto {
    @IsNotEmpty()
    name: string;
    
    
}
