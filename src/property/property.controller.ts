import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { EntityNotFoundError } from 'typeorm';

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
      const property = await this.propertyService.findOne(id);
      if (!property) {
        throw new Error('Property not found!!');
      }
      //Return data if found
      return property;
    } catch (error) {
      console.error(`Error: ${error.message}`);

      //Handle specific database errors and return appropriate status codes
      if (error instanceof EntityNotFoundError) {
        throw new InternalServerErrorException('Database error occurred');
      }

      // For unhandled errors, return a generic 500 Internal Server Error
      throw new InternalServerErrorException('Internal server error');
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
    return this.propertyService.update(id, property);
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
