import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitsOfMeansurementService } from './units_of_meansurement.service';
import { CreateUnitsOfMeansurementDto } from './dto/create-units_of_meansurement.dto';
import { UpdateUnitsOfMeansurementDto } from './dto/update-units_of_meansurement.dto';

@Controller('units-of-meansurement')
export class UnitsOfMeansurementController {
  constructor(private readonly unitsOfMeansurementService: UnitsOfMeansurementService) {}

  @Post()
  create(@Body() createUnitsOfMeansurementDto: CreateUnitsOfMeansurementDto) {
    return this.unitsOfMeansurementService.create(createUnitsOfMeansurementDto);
  }

  @Get()
  findAll() {
    return this.unitsOfMeansurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsOfMeansurementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitsOfMeansurementDto: UpdateUnitsOfMeansurementDto) {
    return this.unitsOfMeansurementService.update(+id, updateUnitsOfMeansurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsOfMeansurementService.remove(+id);
  }
}
