import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import {
  CreatePropertyDTO,
  UpdatePropertyDTO,
  CreatePropertyDTOSchema,
  UpdatePropertyDTOSchema,
} from './property.dto';
import { validate } from '../utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('property')
@ApiTags('Property')
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
  @ApiBody({
    schema: CreatePropertyDTOSchema,
  })
  async create(@Body() body: CreatePropertyDTO): Promise<Property> {
    validate(body, CreatePropertyDTOSchema);
    return await this.propertyService.create(body);
  }

  //Update a property
  @Patch()
  @ApiBody({
    schema: UpdatePropertyDTOSchema,
  })
  async update(@Body() body: UpdatePropertyDTO): Promise<Property> {
    validate(body, UpdatePropertyDTOSchema);

    //handle the error if the property is not found
    const property = await this.propertyService.update(body);
    if (!property) {
      throw new NotFoundException(
        `Property with id ${body.id} was not found. Therefore, unable to make update!`,
      );
    }
    return await this.propertyService.update(body);
  }

  //Delete a property
  @Delete(':id')
  async delete(@Param('id') id: string) {
    //handle the error if region not found
    const property = await this.propertyService.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property with id ${id} was not found!`);
    }
    return this.propertyService.delete(id);
  }
}
