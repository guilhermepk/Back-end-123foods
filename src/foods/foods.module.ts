
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Foods } from './entities/foods.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Foods]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports:[FoodsService],
})
export class FoodsModule {}