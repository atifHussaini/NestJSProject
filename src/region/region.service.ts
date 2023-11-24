import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UpdateRegionDTO, CreateRegionDTO } from './region.dto';
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
  async findOne(id: string): Promise<Region> {
    const region = await this.regionRepository.findOne({
      where: { id },
      relations: ['properties'],
    });

    if (!region) {
      throw new NotFoundException(`Region with id ${id} was not found!`);
    }
    return region;
  }

  //Create a region
  async create(createRegionBody: CreateRegionDTO): Promise<Region> {
    try {
      const newRegion = this.regionRepository.create(createRegionBody);
      return await this.regionRepository.save(newRegion);
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }
  }

  //Update a region
  async update(updateRegion: UpdateRegionDTO): Promise<Region> {
    const region = await this.regionRepository.findOne({
      where: { id: updateRegion.id },
    });
    if (!region) {
      throw new NotFoundException(
        `Region with id ${updateRegion.id} was not found!`,
      );
    }

    try {
      await this.regionRepository.update(
        { id: updateRegion.id, deleted_at: IsNull() },
        updateRegion,
      );
      return await this.regionRepository.findOne({
        where: { id: updateRegion.id },
        relations: ['properties'],
      });
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }
  }

  //Delete a region
  async delete(id: string): Promise<Region> {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Region with id ${id} was not found!`);
    }
    region.deleted_at = new Date();
    return await this.regionRepository.save(region);
  }
}
