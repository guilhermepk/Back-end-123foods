import { Controller, Get, Post, Body, Patch, Param, Delete, Render, NotFoundException, Query, UploadedFiles, UploadedFile, BadRequestException } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Foods } from './entities/foods.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  // create(@Body() createFoodDto: CreateFoodDto) {
  //   return this.foodsService.create(createFoodDto);
  // }

  // async createFoodWithImages(@UploadedFiles() files, @Body() foodDto: FoodDto) {
  //   const createdFood = await this.foodsService.createFoodWithImages(foodDto, files.images);
  //   return createdFood;
  // }

  async create(@UploadedFile() file: Express.Multer.File, @Body() createFoodDto: CreateFoodDto){
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const uploadPath = './uploads/' + fileName;

    await fs.move(file.path, uploadPath);
    
    const food = await this.foodsService.create(createFoodDto);
    const image = await this.foodsService.createImage(uploadPath);

    const relation = await this.foodsService.createFoodsHasImages(food.id, image.id)
    
    return { food, image, relation };
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
@Get('search')
  async searchFoods(@Query('filterValue') filterValue: string): Promise<Foods[]> {
    return this.foodsService.search(filterValue);
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