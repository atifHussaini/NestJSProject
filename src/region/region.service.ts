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
}
