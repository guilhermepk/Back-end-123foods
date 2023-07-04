import{Controller,Get,Render,Post,Body,Redirect,Res,Param, Patch, NotFoundException, Delete} from '@nestjs/common';
import { FoodsService } from 'src/foods/foods.service';
import { Food } from '../foods/entities/food.entity';
import { Response } from 'express';
import { UpdateFoodDto } from 'src/foods/dto/update-food.dto';
import { CreateFoodDto } from 'src/foods/dto/create-food.dto';
@Controller()
export class ViewController{
    constructor(private readonly foodsservice: FoodsService){

    }
    @Get()
    @Render('index')
    home(){
        return{};
    }
    @Get('/food-create')
    @Render('food-create')
  async foodCreate() {
    const foods = await this.foodsservice.findAll();
    return { foods };
  },
  @Post('food-create')
  async createFood(@Body() createFoodDto: CreateFoodDto, @Res() res: Response) {
    const createdFood = await this.foodsservice.create(createFoodDto);
    return res.status(201).json({
      success: true,
      message: 'Alimento cadastrado com sucesso!',
    });
  }
  @Get('itens')
  @Render('listar') 
  async itemList() {
    const items = await this.foodsservice.findAll();
    return { items };
  }
  @Get('/food-update/:id')
  @Render('food-update')
  async foodUpdate(@Param('id') id: number) {
    const food = await this.foodsservice.findOne(id);
    return { food };
  }
  @Patch('/food-update/:id')
  async updateFood(@Param('id') id: number, @Body() updateFoodDto: UpdateFoodDto, @Res() res: Response) {
    const updatedFood = await this.foodsservice.update(id, updateFoodDto);
    if (!updatedFood) {
      throw new NotFoundException('Food not found');
    }
    return res.status(200).json({
      success: true,
      message: 'Alimento atualizado com sucesso!',
      data: updatedFood,
    });
  }
  @Delete('/food-delete/:id')
  async deleteFood(@Param('id') id: number, @Res() res: Response) {
    const deletedFood = await this.foodsservice.remove(id);
    return res.status(200).json({
      success: true,
      message: 'Alimento deletado com sucesso!',
    });
  }
 
}
    
 
