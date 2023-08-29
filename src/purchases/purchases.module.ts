import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchases } from './entities/purchases.entity';
import { Users } from 'src/users/entities/users.entity';
import { Foods } from 'src/foods/entities/foods.entity';
import { Images } from 'src/images/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchases,Images,Foods, Users])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
