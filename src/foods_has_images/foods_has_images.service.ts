import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FoodsHasImages } from './entities/foods_has_image.entity';
import { CreateFoodsHasImageDto } from './dto/create-foods_has_image.dto';
import { UpdateFoodsHasImageDto } from './dto/update-foods_has_image.dto';
import { Repository } from "typeorm";
import { Foods } from "src/foods/entities/foods.entity";
import { Images } from "src/images/entities/images.entity";

@Injectable()

export class FoodsHasImagesService {
  constructor(
    @InjectRepository(FoodsHasImages)
    private foodsHasImageRepository: Repository<FoodsHasImages>,
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>
  ) {}

  async create(createFoodsHasImageDto: CreateFoodsHasImageDto): Promise<FoodsHasImages> {
    const idFoodHasImage = await this.foodsHasImageRepository.findOne({ relations: { food: true, image: true},  where: { food : { id: createFoodsHasImageDto.foodId }, image: { id: createFoodsHasImageDto.imageId}}});
    console.log(idFoodHasImage);
    if (idFoodHasImage) throw new NotAcceptableException('Ja tem essa relação');

    const food = await this.foodRepository.findOne({ where: { id: createFoodsHasImageDto.foodId}});
    if (!food) throw new NotFoundException('Não encontrado food');
    
    const image = await this.imageRepository.findOne({ where: { id: createFoodsHasImageDto.imageId}});
    if (!image) throw new NotFoundException('Não encontrado image');

    
    const newFoodHasImage = new FoodsHasImages();
    newFoodHasImage.food = food;
    newFoodHasImage.image = image;

    //const foods_has_image = this.foodsHasImageRepository.create(createFoodsHasImageDto);

    return this.foodsHasImageRepository.save(newFoodHasImage);
  }

  async findAll(): Promise<FoodsHasImages[]> {
    return this.foodsHasImageRepository.find();
  }

  async findOne(id: number): Promise<FoodsHasImages> {
    return this.foodsHasImageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFoodsHasImageDto: UpdateFoodsHasImageDto): Promise<FoodsHasImages> {
    const foods_has_image = await this.foodsHasImageRepository.findOne({ where: { id } });
    if (!foods_has_image) {
      throw new NotFoundException('Food_has_images not found');
    }
    foods_has_image.food.id = updateFoodsHasImageDto.foodId;
    foods_has_image.image.id = updateFoodsHasImageDto.imageId;

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