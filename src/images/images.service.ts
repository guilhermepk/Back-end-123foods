import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(imageObject): Promise<Images> {
    const newImage = new Images();
    newImage.path = imageObject.path;
    newImage.product = imageObject.productId;

    return this.imageRepository.save(newImage);
  }

  async findOne(id: number): Promise<Images> {
    return this.imageRepository.findOne({ where: { id } });
  }

  async update(productId, file): Promise<Images> {
    const image = (await this.imageRepository.createQueryBuilder('image')
      .leftJoinAndSelect('image.product', 'product')
      .where('product.id = :productId', { productId: productId })
      .getMany())[0]

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    console.log('imagem encontrada:', image)
    console.log('imagem recebida:', file)

    
    // await fs.move(file.path, uploadPath);

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
