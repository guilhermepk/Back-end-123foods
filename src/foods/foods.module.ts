import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Foods } from './entities/foods.entity';
import { Images } from 'src/images/entities/images.entity';
import { UnitsOfMeansurement } from 'src/units_of_meansurement/entities/units_of_meansurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foods, Images,UnitsOfMeansurement])],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
