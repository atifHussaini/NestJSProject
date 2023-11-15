import { Injectable } from '@nestjs/common';
import { InjectRespository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRespository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  //Get all regions
  async findAll(): Promise<Region[]> {
    return await this.regionRepository.find();
  }

  //Get one region
  async findOne(id: number): Promise<Region> {
    return await this.regionRepository.findOne({ where: { id } });
  }

  //Create a region
  async create(region: Region): Promise<Region> {
    const newRegion = this.regionRepository.create(region);
    return await this.regionRepository.save(newRegion);
  }

  //Update a region
  async update(id: number, region: Region): Promise<Region> {
    await this.regionRepository.update(id, region);
    return await this.regionRepository.findOne({ where: { id } });
  }

  //Delete a region
  async delete(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
