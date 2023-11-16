import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  //Get all regions
  async findAll(): Promise<Region[]> {
    return await this.regionRepository.find({ relations: ['properties'] });
  }

  //Get a region
  async findOne(id: number): Promise<Region> {
    return await this.regionRepository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  //Create a region
  async create(region: Region): Promise<Region> {
    const newRegion = this.regionRepository.create(region);
    return await this.regionRepository.save(newRegion);
  }

  //Update a region
  async update(id: number, updateRegion: Region): Promise<Region> {
    await this.regionRepository.update(id, updateRegion);
    return await this.regionRepository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  //Delete a region
  async delete(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
