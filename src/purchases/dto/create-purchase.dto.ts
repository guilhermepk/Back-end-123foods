import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Users } from 'src/users/entities/users.entity';
import { Foods } from 'src/foods/entities/foods.entity';

export class CreatePurchaseDto {

  user: Users;

  food: Foods;

  @IsNumber()
  amount: number;
}