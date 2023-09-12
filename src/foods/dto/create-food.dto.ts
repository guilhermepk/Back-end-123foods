import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string = 'Nenhuma';

  // @IsNumber(undefined, { message: "O valor da propriedade 'weight' deve ser um número." })
  @IsNotEmpty()
  weight: number;

  @IsNumber()
    unit_of_measurementId: number;


  @IsNotEmpty()
  category: string;

  // @IsNumber(undefined, { message: "O valor da propriedade 'amount' deve ser um número." })
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  // @IsNumber(undefined, { message: "O valor da propriedade 'price' deve ser um número." })
  price: number;
}
