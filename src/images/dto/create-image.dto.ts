import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  path: string;

  @IsNumber()
  productId: number;
}
