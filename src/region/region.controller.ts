import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.entity';
import {
  UpdateRegionDTO,
  CreateRegionDTO,
  CreateRegionDTOSchema,
  UpdateRegionDTOSchema,
} from './region.dto';
import { validate } from '../utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('region')
@ApiTags('Region')
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
    return await this.regionService.findOne(id);
  }

  //Create region
  @Post()
  @ApiBody({
    schema: CreateRegionDTOSchema,
  })
  async create(@Body() body: CreateRegionDTO): Promise<Region> {
    validate(body, CreateRegionDTOSchema);
    return await this.regionService.create(body);
  }

  //Update region
  @Patch()
  @ApiBody({
    schema: UpdateRegionDTOSchema,
  })
  async update(@Body() body: UpdateRegionDTO): Promise<Region> {
    validate(body, UpdateRegionDTOSchema);
    return await this.regionService.update(body);
  }

  //Delete a region
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Region> {
    return await this.regionService.delete(id);
  }
}
