import { Injectable } from '@nestjs/common';
import { CreateUnitsOfMeasurementDto } from './dto/create-units_of_measurement.dto';
import { UpdateUnitsOfMeasurementDto } from './dto/update-units_of_measurement.dto';

@Injectable()
export class UnitsOfMeasurementService {
  create(createUnitsOfMeasurementDto: CreateUnitsOfMeasurementDto) {
    return 'This action adds a new unitsOfMeansurement';
  }

  findAll() {
    return `This action returns all unitsOfMeansurement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unitsOfMeansurement`;
  }

  update(id: number, updateUnitsOfMeasurementDto: UpdateUnitsOfMeasurementDto) {
    return `This action updates a #${id} unitsOfMeansurement`;
  }

  remove(id: number) {
    return `This action removes a #${id} unitsOfMeansurement`;
  }
}
