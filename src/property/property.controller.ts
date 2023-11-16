import { Controller, Post, Body, Param } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { CreatePropertyDto } from './create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  //Create property with regionId
  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }
}
