import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Offers } from 'src/offers/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories,Offers])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports:[CategoriesService],
})
export class CategoriesModule {}
