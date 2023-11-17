import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  //Get all properties
  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find({ relations: ['region'] });
  }

  //Get a property
  async findOne(id: number): Promise<Property> {
    return await this.propertyRepository.findOne({
      where: { id },
      relations: ['region'],
    });
  }

  //Create a property
  async create(property: Property): Promise<Property> {
    const newProperty = this.propertyRepository.create(property);
    return await this.propertyRepository.save(newProperty);
  }

  //Update a property
  async update(id: number, updateProperty: Property): Promise<Property> {
    await this.propertyRepository.update(id, updateProperty);
    return await this.propertyRepository.findOne({
      where: { id },
      relations: ['region'],
    });
  }

  //Delete a property
  async delete(id: number): Promise<void> {
    await this.propertyRepository.delete(id);
  }
}
