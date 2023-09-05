import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Foods } from './entities/foods.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Images } from 'src/images/entities/images.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Foods> {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async createImage(path: string, foodId): Promise<Images> {
    const newImage = new Images();
    newImage.path = path;
    newImage.food = foodId;

    return this.imageRepository.save(newImage);
  }

  async priceAll(minPrice: number, maxPrice: number): Promise<Foods[]> {
    return this.foodRepository.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
    });
  }

  async searchName(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where:
        { name: ILike(`%${filterValue}%`) }
    });
  }

  async searchBrand(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where:
        { brand: ILike(`%${filterValue}%`) }
    });
  }

  async searchCategory(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where:
        { category: ILike(`%${filterValue}%`) }
    });
  }

  async searchDescription(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where:
        { description: ILike(`%${filterValue}%`) }
    });
  }

  productInList = (product, list) => {
    if (list.length < 1){
      return false
    }
    let inside = false
    list.map((item) => {
      if (item.id === product.id){
        inside = true
      }
    })

    return inside
  }

  async search(filterValue: string): Promise<Foods[]> {
    const names = [...await this.searchName(filterValue)];
    const brands = [...await this.searchBrand(filterValue)];
    const categories = [...await this.searchCategory(filterValue)];
    const descriptions = [...await this.searchDescription(filterValue)];
    let products = [...names]

    brands.map((item) => {
      if (!this.productInList(item, products)){
        products.push(item)
      }
    })
    categories.map((item) => {
      if (!this.productInList(item, products)){
        products.push(item)
      }
    })
    descriptions.map((item) => {
      if (!this.productInList(item, products)){
        products.push(item)
      }
    })

    return products;
  }

  async filterAll(filterType: string, filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where: { [filterType]: ILike(`%${filterValue}%`) }, relations: ['images']
    });
  }

  async findOne(id: number): Promise<Foods> {
    return this.foodRepository.findOne({
      where: { id },
      relations: ['images'], // Load associated images
    });
  }

  async findAll(): Promise<Foods[]> {
    return this.foodRepository.find({
      relations: ['images'],
    });
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
    food.amount = updateFoodDto.amount;
    food.description = updateFoodDto.description;
    food.price = updateFoodDto.price;

    const updatedFood = await this.foodRepository.save(food);

    return updatedFood;
  }

  async remove(id: number): Promise<void> {
    const foodId = id;
    const food = await this.imageRepository.delete(foodId);
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Food not found');
    }
  }
}
