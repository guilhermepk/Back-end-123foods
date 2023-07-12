import { Module } from '@nestjs/common';
import { FoodsHasImagesService } from './foods_has_images.service';
import { FoodsHasImagesController } from './foods_has_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsHasImages } from './entities/foods_has_image.entity';
import { Foods } from 'src/foods/entities/foods.entity';
import { Images } from 'src/images/entities/images.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FoodsHasImages, Foods, Images]),
  ],
  controllers: [FoodsHasImagesController],
  providers: [FoodsHasImagesService],
  exports:[FoodsHasImagesService],
})
export class FoodsHasImagesModule {}
