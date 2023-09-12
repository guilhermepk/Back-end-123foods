import { Module } from '@nestjs/common';
import { UnitsOfMeansurementService } from './units_of_meansurement.service';
import { UnitsOfMeansurementController } from './units_of_meansurement.controller';

@Module({
  controllers: [UnitsOfMeansurementController],
  providers: [UnitsOfMeansurementService]
})
export class UnitsOfMeansurementModule {}
