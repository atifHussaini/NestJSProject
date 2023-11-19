import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  InternalServerErrorException,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';

export interface PropertyUpdatePayload {
  address?: string;
  data?: Record<any, any>;
  regionId?: string;
}

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
    try {
      //handle the error if property does not exist
      return await this.propertyService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //Create a property
  @Post()
  async create(@Body() property: Property): Promise<Property> {
    return await this.propertyService.create(property);
  }

  //Update a property
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: PropertyUpdatePayload,
  ): Promise<Property> {
    return this.propertyService.update(id, body);
  }

  //Delete a property
  @Delete(':id')
  async delete(@Param('id') id: string) {
    //handle the error if region not found
    const property = await this.propertyService.findOne(id);
    if (!property) {
      throw new Error('Property was not found!!');
    }
    return this.propertyService.delete(id);
  }
}

