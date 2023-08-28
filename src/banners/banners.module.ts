import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banners } from './entities/banners.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banners])],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [BannersService],
})
export class BannersModule {}
