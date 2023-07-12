import { Module } from '@nestjs/common';
import { FoodsHasImagesService } from './foods_has_images.service';
import { FoodsHasImagesController } from './foods_has_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsHasImages } from './entities/foods_has_image.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FoodsHasImages]),
  ],
  controllers: [FoodsHasImagesController],
  providers: [FoodsHasImagesService],
  exports:[FoodsHasImagesService],
})
export class FoodsHasImagesModule {}
