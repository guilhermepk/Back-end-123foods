import { IsNumber } from 'class-validator';

export class CreatePurchaseDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  foodId: number;

  @IsNumber()
  amount: number;
}