import { Module} from '@nestjs/common';
import { UnitsOfMeasurementService } from './units_of_measurement.service';
import { UnitsOfMeasurementController } from './units_of_measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsOfMeasurement } from './entities/units_of_measurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitsOfMeasurement])],
  controllers: [UnitsOfMeasurementController],
  providers: [UnitsOfMeasurementService],
  exports:[UnitsOfMeasurementService],
})
export class UnitsOfMeasurementModule {}
