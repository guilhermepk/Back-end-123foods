import { Module } from '@nestjs/common';
import { UnitsOfMeasurementService } from './units_of_measurement.service';
import { UnitsOfMeasurementController } from './units_of_measurement.controller';

@Module({
  controllers: [UnitsOfMeasurementController],
  providers: [UnitsOfMeasurementService]
})
export class UnitsOfMeasurementModule {}
