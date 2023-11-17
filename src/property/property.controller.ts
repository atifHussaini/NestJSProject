import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  //Get all properties
  @Get()
  async findAll(): Promise<Property[]> {
    return await this.propertyService.findAll();
  }

  //Get a property
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Property> {
    //handle the error if property does not exist
    const property = await this.propertyService.findOne(Number(id));
    if (!property) {
      throw new Error('Property not found!!');
    } else {
      return property;
    }
  }

  //Create a property
  @Post()
  async create(@Body() property: Property): Promise<Property> {
    return await this.propertyService.create(property);
  }

  //Update a property
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() property: Property,
  ): Promise<Property> {
    return this.propertyService.update(Number(id), property);
  }

  //Delete a property
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    //handle the error if region not found
    const property = await this.propertyService.findOne(Number(id));
    if (!property) {
      throw new Error('Region not found!!');
    }
    return this.propertyService.delete(Number(id));
  }
}
