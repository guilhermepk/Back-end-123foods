import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchases } from './entities/purchases.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Purchases]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports:[PurchasesService],
})
export class PurchasesModule {}