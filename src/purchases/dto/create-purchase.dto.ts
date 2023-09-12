import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseDto {
  
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  status:string;
 
  @IsNotEmpty()
  imageId: number;
  
  @IsNotEmpty()
  productId:number;

  @IsNotEmpty()
  amount: number;
}
