
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Foods } from './entities/foods.entity';
import { FoodsHasImages } from 'src/foods_has_images/entities/foods_has_image.entity';
import { Images } from 'src/images/entities/images.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([FoodsHasImages, Foods, Images]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports:[FoodsService],
})
export class FoodsModule {}