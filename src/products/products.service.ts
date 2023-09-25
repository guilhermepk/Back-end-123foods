import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Images } from 'src/images/entities/images.entity';
import { UnitsOfMeasurement } from 'src/units_of_measurement/entities/units_of_measurement.entity';
import { Categories } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(UnitsOfMeasurement)
    private units_of_measurementRepository:Repository<UnitsOfMeasurement>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>, 
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    const unit_of_measurement = await this.units_of_measurementRepository.findOne({
      where: { id: createProductDto.unitsofmeasurementId },
    });
    if (!unit_of_measurement) throw new NotFoundException('Não encontrado  a  unidade de medida');
    const newProduct = new Products();
    newProduct.name = createProductDto.name;
    newProduct.amount = createProductDto.amount;
    newProduct.brand = createProductDto.brand;
    newProduct.description = createProductDto.description;
    newProduct.price = createProductDto.price;
    newProduct.weight = createProductDto.weight;
    newProduct.units_of_measurements = unit_of_measurement;

    newProduct.categories = await this.findCategoriesByIds(createProductDto.categoryIds);

    return this.productRepository.save(newProduct);
  }

  async findCategoriesByIds(ids: number[]): Promise<Categories[]> {
    console.log("procurando categorias", ids);
    return this.categoryRepository.findByIds(ids);
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
      .leftJoinAndSelect('categories.offer', 'offer') 
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categories')
      .getMany();
  }

  async searchBrand(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.brand ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('categories.offer', 'offer') 
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categories')
      .getMany();
  }

  async searchCategory(filterValue: string){
    try{
      const categories = await this.categoryRepository.createQueryBuilder('category')
        .where('category.name ILIKE :name', { name: `%${filterValue}%` })
        .getMany()

      let products = []
      if (categories[0]){
        products = await this.productRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.categories', 'category')
          .where('category.id IN (:...ids)', { ids: categories.map(category => category.id) })
          .leftJoinAndSelect('product.images', 'images')
          .leftJoinAndSelect('categories.offer', 'offer') 
          .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
          .getMany()
      }

      return products;
    }catch (error){
      
    }
  }

  async searchDescription(filterValue: string): Promise<Products[]> {
    const products = await this.productRepository.createQueryBuilder('product')
      .where('product.description ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('categories.offer', 'offer') 
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categoryId') 
      .getMany();
      
      return products;
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
    let products = []
    if (filterType !== 'category'){
      products = await this.productRepository.find({
        where: { [filterType]: ILike(`%${filterValue}%`) }, relations: ['images','units_of_measurements','categories']
      });
    }else{
      products = await this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.categories', 'category')
        .where('category.name ILIKE :categoryName', { categoryName: `%${filterValue}%` })
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('categories.offer', 'offer') 
        .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
        .getMany()
    }


    return products;
  }

  async findOne(id: number): Promise<Products> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['images', 'units_of_measurements', 'categories'], 
    });
  }

  async findAll(): Promise<Products[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categories') 
      .leftJoinAndSelect('categories.offer', 'offer') 
      .getMany();
  }
  
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Products> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
  
    product.name = updateProductDto.name;
    product.brand = updateProductDto.brand;
    product.weight = updateProductDto.weight;
    product.amount = updateProductDto.amount;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
  
    if (updateProductDto.categoryIds) product.categories = await this.findCategoriesByIds(updateProductDto.categoryIds);
  
    const updatedProduct = await this.productRepository.save(product);
  
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const productId = id;
    const product = await this.productRepository.findOne({where:{id}});

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.deletedAt = new Date();
    
    await this.productRepository.save(product);
  }
}

