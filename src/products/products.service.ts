import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, In, Not, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Images } from 'src/images/entities/images.entity';
import { UnitsOfMeasurement } from 'src/units_of_measurement/entities/units_of_measurement.entity';
import { Categories } from 'src/categories/entities/categories.entity';
import { ImagesService } from 'src/images/images.service';
import { ProductsController } from './products.controller';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(UnitsOfMeasurement)
    private units_of_measurementRepository:Repository<UnitsOfMeasurement>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>, 
    private readonly imagesService: ImagesService
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
    newProduct.categories = await this.findCategoriesByIds(createProductDto.categoriesIds);
    return this.productRepository.save(newProduct);
  };

  async createImage(path, productId){
    const imageObject = {
      path: path,
      productId: productId
    }
    return await this.imagesService.create(imageObject);
  };

  async updateImage(){
  };

  async findCategoriesByIds(ids: number[]): Promise<Categories[]> {
    return this.categoriesRepository.findByIds(ids);
  };

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
  };

  async searchBrand(filterValue: string): Promise<Products[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('product.brand ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('categories.offer', 'offer') 
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categories')
      .getMany();
  };

  async searchCategories(filterValue: string){
    try{
      const categories = await this.categoriesRepository.createQueryBuilder('categories')
        .where('categories.name ILIKE :name', { name: `%${filterValue}%` })
        .getMany()
      let products = []
      if (categories[0]){
        products = await this.productRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.categories', 'categories')
          .where('categories.id IN (:...ids)', { ids: categories.map(categories => categories.id) })
          .leftJoinAndSelect('product.images', 'images')
          .leftJoinAndSelect('categories.offer', 'offer') 
          .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
          .getMany()
      }
      return products;
    }catch (error){   
    }
  };

  async findSimilar(productId: number): Promise<Products[]> {
    const query = `
    SELECT DISTINCT ON (p.id)
    p.name AS name,
    p.brand AS brand,
    p.weight AS weight,
    p.amount AS amount,
    p.description AS description,
    p.price AS price,
    i.*,
    STRING_AGG(c.name, ', ') AS category_names 
FROM
    products p
JOIN
    images i ON p.id = i."productId"
JOIN
    category_products cp ON p.id = cp."productsId"
JOIN
    categories c ON cp."categoriesId" = c.id
WHERE
    p.id <> ${productId} 
    AND EXISTS (
        SELECT 1
        FROM category_products cp1
        WHERE cp1."productsId" = p.id
        AND cp1."categoriesId" IN (
            SELECT "categoriesId"
            FROM category_products
            WHERE "productsId" = ${productId} 
        )
        GROUP BY cp1."productsId"
        HAVING COUNT(DISTINCT cp1."categoriesId") >= 2
    )
    AND p.id = (
        SELECT MAX(p2.id)
        FROM products p2
        JOIN category_products cp2 ON p2.id = cp2."productsId"
        WHERE cp2."productsId" = p.id
        AND cp2."categoriesId" IN (
            SELECT "categoriesId"
            FROM category_products
            WHERE "productsId" = ${productId} 
        )
        GROUP BY cp2."productsId"
    )
    GROUP BY p.id, p.name, p.brand, p.weight, p.amount, p.description, p.price, i.id, i.path;
    `;
    try {
      const result = await this.productRepository.query(query);
      return result;
    } catch (error) {
      throw new Error(`Erro na consulta SQL: ${error.message}`);
    }
  };

  async searchDescription(filterValue: string): Promise<Products[]> {
    const products = await this.productRepository.createQueryBuilder('product')
      .where('product.description ILIKE :filterValue', { filterValue: `%${filterValue}%` })
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('categories.offer', 'offer') 
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categoriesId') 
      .getMany();
      
      return products;
  };

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
  };

  async search(filterValue: string): Promise<Products[]> {
    const names = [...await this.searchName(filterValue)];
    const brands = [...await this.searchBrand(filterValue)];
    const categories = [...await this.searchCategories(filterValue)];
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
  };

  async filterAll(filterType: string, filterValue: string): Promise<Products[]> {
    let products = []
    if (filterType !== 'categories'){
      products = await this.productRepository.find({
        where: { [filterType]: ILike(`%${filterValue}%`) }, relations: ['images','units_of_measurements','categories']
      });
    }else{
      products = await this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.categories', 'categories')
        .where('categories.name ILIKE :categoriesName', { categoriesName: `%${filterValue}%` })
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('categories.offer', 'offer') 
        .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
        .getMany()
    }


    return products;
  };

  async findOne(id: number): Promise<Products> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['images', 'units_of_measurements', 'categories'], 
    });
  };

  async findAll(): Promise<Products[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.units_of_measurements', 'unitsofmeasurementId')
      .leftJoinAndSelect('product.categories', 'categories') 
      .leftJoinAndSelect('categories.offer', 'offer') 
      .getMany();
  };

  async findImage(productId){
    return this.imagesService.findByProductId(productId);
  };

  async removeImage(imageId){
    this.imagesService.remove(imageId);
  };
  
  async update(id: number, updateProductDto: UpdateProductDto, file): Promise<Products> {
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
  
    console.log('up', updateProductDto)
    if (updateProductDto.categoriesIds) product.categories = await this.findCategoriesByIds(updateProductDto.categoriesIds);
  
    const updatedProduct = await this.productRepository.save(product);
  
    return updatedProduct;
  };

  async remove(id: number): Promise<void> {
    const productId = id;
    const product = await this.productRepository.findOne({where:{id}});

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.deletedAt = new Date();
    
    await this.productRepository.save(product);
  };
  
}

