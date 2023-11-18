import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.regionRepository
      .find({ relations: ['properties'] })
      .catch((error) => {
        throw new NotFoundException(`Failed to fetch regions! ${error}`);
      });
  }

  //Get a region
  async findOne(id: string): Promise<Region> {
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
  async update(id: string, updateRegion: Region): Promise<Region> {
    await this.regionRepository.update(id, updateRegion);
    return await this.regionRepository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  //Delete a region
  async delete(id: string): Promise<void> {
    const region = await this.regionRepository.findOne({ where: { id } });

    if (!region) {
      throw new NotFoundException(`Region with id ${id} was not found!`);
    }

    region.deleted_at = new Date();
    await this.regionRepository.save(region);
  }
}
