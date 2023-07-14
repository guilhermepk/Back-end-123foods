import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchases } from './entities/purchases.entity';
import { Users } from 'src/users/entities/users.entity';
import { Foods } from 'src/foods/entities/foods.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchases, Foods,Users]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports:[PurchasesService],
})
export class PurchasesModule {}