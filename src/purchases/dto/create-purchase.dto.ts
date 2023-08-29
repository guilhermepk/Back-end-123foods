import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  
  @IsNotEmpty()
  userId: number;

  @IsString()
  status:string;
 
  @IsNotEmpty()
  imageId: number;
  
  @IsNotEmpty()
  foodId:number;

  @IsNotEmpty()
  amount: number;
}
