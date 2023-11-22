import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.entity';
import { EntityNotFoundError } from 'typeorm';
import {
  UpdateRegionDTO,
  CreateRegionDTO,
  CreateRegionDTOSchema,
  UpdateRegionDTOSchema,
} from './region.dto';
import { validate } from '../utils';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  //Get all regions
  @Get()
  async findAll(): Promise<Region[]> {
    return await this.regionService.findAll();
  }

  //Get one region
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Region> {
    try {
      //handle the error if region does not exist
      const region = await this.regionService.findOne(id);
      if (!region) {
        throw new Error('Region not found!!');
      }
      //Return data if found
      return region;
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

  //Create region
  @Post()
  async create(@Body() body: CreateRegionDTO): Promise<Region> {
    validate(body, CreateRegionDTOSchema);
    return await this.regionService.create(body);
  }

  //Update region
  @Patch()
  async update(@Body() body: UpdateRegionDTO): Promise<Region> {
    validate(body, UpdateRegionDTOSchema);

    //handle the erro if the region is not found
    const region = await this.regionService.update(body);
    if (!region) {
      throw new NotFoundException(
        `Region with id ${UpdateRegionDTOSchema.id} was not found. Therefore, unable to make update!`,
      );
    }

    return region;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    //handle the error if region not found
    const region = await this.regionService.findOne(id);
    if (!region) {
      throw new NotFoundException(`Region with id ${id} was not found!!`);
    }
    return this.regionService.delete(id);
  }
}
