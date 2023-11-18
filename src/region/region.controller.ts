import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.entity';

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
    //handle the error if region does not exist
    const region = await this.regionService.findOne(id);
    if (!region) {
      throw new Error('Region not found!!');
    } else {
      return region;
    }
  }

  //Create region
  @Post()
  async create(@Body() region: Region): Promise<Region> {
    return await this.regionService.create(region);
  }

  //Update region
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() region: Region,
  ): Promise<Region> {
    return this.regionService.update(id, region);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    //handle the error if region not found
    const region = await this.regionService.findOne(id);
    if (!region) {
      throw new Error('Region not found!!');
    }
    return this.regionService.delete(Number(id));
  }
}
