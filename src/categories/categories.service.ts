import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
    )
    {}
    async create(CreateCategoryDto: CreateCategoryDto):Promise<Category> {
      const unit_of_measurement=await this.categoryRepository.create(CreateCategoryDto)
      return this.categoryRepository.save(unit_of_measurement);
    }

  findAll():Promise<Category[]> {
    return this.categoryRepository.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number): Promise<void> {
    const categoryId = id;
    const category= await this.categoryRepository.delete(categoryId );
  }
}
