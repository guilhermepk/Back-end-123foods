import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FoodsHasImages } from './entities/foods_has_image.entity';
import { CreateFoodsHasImageDto } from './dto/create-foods_has_image.dto';
import { UpdateFoodsHasImageDto } from './dto/update-foods_has_image.dto';
import { Repository } from "typeorm";

@Injectable()

export class FoodsHasImagesService {
  constructor(
    @InjectRepository(FoodsHasImages)
    private foodsHasImageRepository: Repository<FoodsHasImages>,
  ) {}

  async findAll(): Promise<FoodsHasImages[]> {
    return this.foodsHasImageRepository.find();
  }
  async create(createFoodsHasImageDto: CreateFoodsHasImageDto): Promise<FoodsHasImages> {
    const foods_has_image = this.foodsHasImageRepository.create(createFoodsHasImageDto);
    return this.foodsHasImageRepository.save(foods_has_image);
  }

  async findOne(id: number): Promise<FoodsHasImages> {
    return this.foodsHasImageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFoodsHasImageDto: UpdateFoodsHasImageDto): Promise<FoodsHasImages> {
    const foods_has_image = await this.foodsHasImageRepository.findOne({ where: { id } });
    if (!foods_has_image) {
      throw new NotFoundException('Food_has_images not found');
    }
    foods_has_image.food = updateFoodsHasImageDto.food;
    foods_has_image.image = updateFoodsHasImageDto.image;

    const updatedFoodsHasImage = await this.foodsHasImageRepository.save(foods_has_image);
  
    return updatedFoodsHasImage;
  }

  async remove(id: number): Promise<void> {
    const result = await this.foodsHasImageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('foods_has_image not found');
    }
  }
}