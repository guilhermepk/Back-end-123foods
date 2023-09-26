import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  brand: string;

  // @IsNumber(undefined, { message: "O valor da propriedade 'weight' deve ser um número." })
  @IsNotEmpty()
  weight: number;

  
  @IsOptional()
  offer:number;
  
  @IsNotEmpty()
  unitsofmeasurementId: number;


  
  @ArrayMinSize(1) 
  categoriesIds: number[];

  // @IsNumber(undefined, { message: "O valor da propriedade 'amount' deve ser um número." })
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  // @IsNumber(undefined, { message: "O valor da propriedade 'price' deve ser um número." })
  price: number;
}
