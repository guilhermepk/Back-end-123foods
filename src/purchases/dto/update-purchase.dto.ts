import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { Users } from 'src/users/entities/users.entity';
import { Foods } from 'src/foods/entities/foods.entity';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
    user: Users;
    food: Foods;
    amount: number;
}