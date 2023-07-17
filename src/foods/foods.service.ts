import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Foods } from './entities/foods.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()

export class FoodsService {
  constructor(
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
  ) {}
  async priceAll( minPrice: number, maxPrice: number): Promise<Foods[]> {
    return this.foodRepository.find({
      where: {
        price: Between(minPrice, maxPrice)
      }
    });
  }
  async search(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where: [
        { name: ILike(`%${filterValue}%`) },
        { description: ILike(`%${filterValue}%`) },
        { category: ILike(`%${filterValue}%`) },
        { brand: ILike(`%${filterValue}%`) },
      ],
    });
  }

  
  async filterAll(filterType: string, filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({ where: { [filterType]: ILike(`%${filterValue}%`) } });
  }

  async findAll(): Promise<Foods[]> {
    return this.foodRepository.find();
  }
  async create(createFoodDto: CreateFoodDto): Promise<Foods> {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findOne(id: number): Promise<Foods> {
    return this.foodRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Foods> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    food.name = updateFoodDto.name;
    food.brand = updateFoodDto.brand;
    food.weight = updateFoodDto.weight;
    food.unit_of_measurement = updateFoodDto.unit_of_measurement;
    food.category = updateFoodDto.category;
    food.qtd = updateFoodDto.qtd;
    food.description = updateFoodDto.description;
    food.price = updateFoodDto.price;
    // food.images = updateFoodDto.images;

    const updatedFood = await this.foodRepository.save(food);
  
    return updatedFood;
  }

  async remove(id: number): Promise<void> {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Food not found');
    }
  }
}
