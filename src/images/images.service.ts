import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './entities/images.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()

export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async findAll(): Promise<Images[]> {
    return this.imageRepository.find();
  }
  async create(createImageDto: CreateImageDto): Promise<Images> {
    const image = this.imageRepository.create(createImageDto);
    return this.imageRepository.save(image);
  }

  async findOne(id: number): Promise<Images> {
    return this.imageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Images> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    image.name = updateImageDto.name;
    image.path = updateImageDto.path;

    const updatedImage = await this.imageRepository.save(image);
  
    return updatedImage;
  }

  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Image not found');
    }
  }
}