import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePostDto } from './create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  //Create a property
  async create(createPostDto: CreatePostDto): Promise<Property> {
    const region = await this.propertyRepository.findOne(createPostDto.regionId);
    if (!region) {
      throw new NotFoundException(
        `User with ID ${createPostDto.regionId} not found`,
      );
    }

    const newProperty = this.propertyRepository.create({
      address: createPostDto.address,
      data: createPostDto.data,
      regionId: region,
    });

    return this.propertyRepository.save(newProperty);
  }

  //Get all properties


  //Update a property
  async update(id: number, property: Property): Promise<Property> {
    await this.propertyRepository.update(id, property);
    return await this.propertyRepository.findOne({ where: { id } });
  }

  //Delete a region
  async delete(id: number): Promise<void> {
    await this.propertyRepository.delete(id);
  }
}
