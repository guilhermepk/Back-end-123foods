import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banners } from './entities/banners.entity';
import * as fs from 'fs-extra';
@Injectable()
export class BannersService {
  findById(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Banners)
    private bannerRepository: Repository<Banners>,
  ) {}
  create(createBannerDto: CreateBannerDto): Promise<Banners> {
    const banner = this.bannerRepository.create(createBannerDto);
    return this.bannerRepository.save(banner);
  }

  findAll(): Promise<Banners[]> {
    return this.bannerRepository.find();
  }

  async remove(id: number): Promise<void> {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException('User not found');
    }

    if (banner.image) {
      const imagePath = './uploads/' + banner.image;
      await fs.unlink(imagePath);
      console.log('Image deleted');
    }

    const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Banner not found');
    }
  }
}
