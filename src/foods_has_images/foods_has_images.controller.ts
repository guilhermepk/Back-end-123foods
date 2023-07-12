import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodsHasImagesService } from './foods_has_images.service';
import { CreateFoodsHasImageDto } from './dto/create-foods_has_image.dto';
import { UpdateFoodsHasImageDto } from './dto/update-foods_has_image.dto';

@Controller('foods-has-images')
export class FoodsHasImagesController {
  constructor(private readonly foodsHasImagesService: FoodsHasImagesService) {}

  @Post()
  create(@Body() createFoodsHasImageDto: CreateFoodsHasImageDto) {
    return this.foodsHasImagesService.create(createFoodsHasImageDto);
  }

  @Get()
  findAll() {
    return this.foodsHasImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsHasImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodsHasImageDto: UpdateFoodsHasImageDto) {
    return this.foodsHasImagesService.update(+id, updateFoodsHasImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsHasImagesService.remove(+id);
  }
}
