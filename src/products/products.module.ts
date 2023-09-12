import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { Images } from 'src/images/entities/images.entity';
import { UnitsOfMeansurement } from 'src/units_of_meansurement/entities/units_of_meansurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Images,UnitsOfMeansurement])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
