import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitsOfMeasurementService } from './units_of_measurement.service';
import { CreateUnitsOfMeasurementDto } from './dto/create-units_of_measurement.dto';
import { UpdateUnitsOfMeasurementDto } from './dto/update-units_of_measurement.dto';

@Controller('unitsofmeasurement')
export class UnitsOfMeasurementController {
  constructor(private readonly unitsOfMeasurementService: UnitsOfMeasurementService) {}

  @Post()
  create(@Body() createUnitsOfMeasurementDto: CreateUnitsOfMeasurementDto) {
    return this.unitsOfMeasurementService.create(createUnitsOfMeasurementDto);
  }

  @Get()
  findAll() {
    return this.unitsOfMeasurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsOfMeasurementService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsOfMeasurementService.remove(+id);
    
  }
}
