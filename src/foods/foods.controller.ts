import { Controller, Get, Post, Body, Patch, Param, Delete, Render, NotFoundException } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Foods } from './entities/foods.entity';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  
  @Get()
  findAll() {
    return this.foodsService.findAll();
  }
  
  @Get(':minPrice/:maxPrice')
  priceAll(
    @Param('minPrice') minPrice: number,
    @Param('maxPrice') maxPrice: number,
  ): Promise<Foods[]> {
  return this.foodsService.priceAll(minPrice, maxPrice);
}

@Get('/filter/:filterType/:filterValue')
filterAll(
  @Param('filterType') filterType: string,
  @Param('filterValue') filterValue: string
): Promise<Foods[]> {
  if(
    filterType === 'name'
    || filterType === 'brand'
    || filterType === 'category'
    || filterType === 'description'
  ){
    return this.foodsService.filterAll(filterType, filterValue);
  }else{
    throw new NotFoundException('Tipo de filtro inválido');
  }
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}