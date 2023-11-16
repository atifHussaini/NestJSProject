import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
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
  async findOne(@Param('id') id: number): Promise<Region> {
    //handle the error if region does not exist
    const user = await this.regionService.findOne(id);
    if (!user) {
      throw new Error('Region not found!!');
    } else {
      return user;
    }
  }

  //Create region
  @Post()
  async create(@Body() region: Region): Promise<Region> {
    return await this.regionService.create(region);
  }

  //Update region
  @Put(':id')
  async update(@Param('id') id: number, @Body() region: Region): Promise<Region> {
    return this.regionService.update(id, region);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if region not found
    const user = await this.regionService.findOne(id);
    if (!user) {
      throw new Error('Region not found!!');
    }
    return this.regionService.delete(id);
  }
}
