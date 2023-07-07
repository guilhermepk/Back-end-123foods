import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entities/carts.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Carts]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports:[CartsService],
})
export class CartsModule {}