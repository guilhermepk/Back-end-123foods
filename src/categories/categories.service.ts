import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offers } from 'src/offers/entities/offer.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Offers)
    private offerRepository: Repository<Offers>
    )
    {}
    async create(CreateCategoryDto: CreateCategoryDto): Promise<Categories> {
      const newCategory = new Categories();
      newCategory.name = CreateCategoryDto.name;
    
      const offerId = CreateCategoryDto.offerId;
      if (offerId) {
        const offer = await this.offerRepository.findOne({ where: { id: offerId } });
        if (!offer) {
          throw new NotFoundException(`Offer with ID ${offerId} not found`);
        }
        newCategory.offer = offer;
      }
    
      return this.categoryRepository.save(newCategory);
    }
    
    
  findAll():Promise<Categories[]> {
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
