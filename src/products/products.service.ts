import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Images } from 'src/images/entities/images.entity';
import { UnitsOfMeasurement } from 'src/units_of_measurement/entities/units_of_measurement.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async createImage(path: string, productId): Promise<Images> {
    const newImage = new Images();
    newImage.path = path;
    newImage.product = productId;

    return this.imageRepository.save(newImage);
  }

  async priceAll(minPrice: number, maxPrice: number): Promise<Products[]> {
    return this.productRepository.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
    });
  };

  async searchName(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.name ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.unit_of_measurement', 'unit_of_measurement')
      .getMany();
  }

  async searchBrand(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.brand ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.unit_of_measurement', 'unit_of_measurement')
      .getMany();
  }

  async searchCategory(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.category ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.unit_of_measurement', 'unit_of_measurement')
      .getMany();
  }

  async searchDescription(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.description ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.unit_of_measurement', 'unit_of_measurement')
      .getMany();
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

  async search(filterValue: string): Promise<Products[]> {
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

  async filterAll(filterType: string, filterValue: string): Promise<Products[]> {
    return this.productRepository.find({
      where: { [filterType]: ILike(`%${filterValue}%`) }, relations: ['images',]
    });
  }

  async findOne(id: number): Promise<Products> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['images'], 
    });
  }

  async findAll(): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.unit_of_measurement', 'unit_of_measurement')
      .getMany();
  }
  
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Products> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.name = updateProductDto.name;
    product.brand = updateProductDto.brand;
    product.weight = updateProductDto.weight;
    product.category = updateProductDto.category;
    product.amount = updateProductDto.amount;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;

    const updatedProduct = await this.productRepository.save(product);

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const productId = id;
    const product = await this.imageRepository.delete(productId);
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
}
