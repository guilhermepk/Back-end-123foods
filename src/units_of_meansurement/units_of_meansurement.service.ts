import { Injectable } from '@nestjs/common';
import { CreateUnitsOfMeansurementDto } from './dto/create-units_of_meansurement.dto';
import { UpdateUnitsOfMeansurementDto } from './dto/update-units_of_meansurement.dto';

@Injectable()
export class UnitsOfMeansurementService {
  create(createUnitsOfMeansurementDto: CreateUnitsOfMeansurementDto) {
    return 'This action adds a new unitsOfMeansurement';
  }

  findAll() {
    return `This action returns all unitsOfMeansurement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unitsOfMeansurement`;
  }

  update(id: number, updateUnitsOfMeansurementDto: UpdateUnitsOfMeansurementDto) {
    return `This action updates a #${id} unitsOfMeansurement`;
  }

  remove(id: number) {
    return `This action removes a #${id} unitsOfMeansurement`;
  }
}
