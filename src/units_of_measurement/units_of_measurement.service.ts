import { Injectable } from '@nestjs/common';
import { CreateUnitsOfMeasurementDto } from './dto/create-units_of_measurement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsOfMeasurement } from './entities/units_of_measurement.entity';

@Injectable()
export class UnitsOfMeasurementService {
  delete: any;
  constructor(
    @InjectRepository(UnitsOfMeasurement)
    private units_of_measurementRepository: Repository<UnitsOfMeasurement>
    )
    {}
    
  
  async create(createUnitsOfMeasurementDto: CreateUnitsOfMeasurementDto):Promise<UnitsOfMeasurement> {
    const unit_of_measurement=await this.units_of_measurementRepository.create(createUnitsOfMeasurementDto)
    return this.units_of_measurementRepository.save(unit_of_measurement);
  }

  findAll():Promise<UnitsOfMeasurement[]> {
    return this.units_of_measurementRepository.find() ;
  }
  

  async findOne(id: number): Promise<UnitsOfMeasurement> {
    return this.units_of_measurementRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const measureId = id;
    const measure = await this.units_of_measurementRepository.delete(measureId );
 
  }
  
}
