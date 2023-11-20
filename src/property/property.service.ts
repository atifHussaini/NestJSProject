import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyCreatePayLoad, PropertyUpdatePayload } from './property.dto';
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
  async findOne(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({
      where: { id },
      relations: ['region'],
    });
  }

  //Create a property
  async create(property: PropertyCreatePayLoad): Promise<Property> {
    const newProperty = this.propertyRepository.create(property);
    return await this.propertyRepository.save(newProperty);
  }

  //Update a property
  async update(
    id: string,
    updateProperty: PropertyUpdatePayload,
  ): Promise<Property> {
    await this.propertyRepository.update(id, updateProperty);
    return await this.propertyRepository.findOne({
      where: { id },
      relations: ['region'],
    });
  }

  //Delete a property
  async delete(id: string): Promise<void> {
    const property = await this.propertyRepository.findOne({ where: { id } });

    if (!property) {
      throw new NotFoundException(`Property with id ${id} was not found!`);
    }

    property.deleted_at = new Date();
    await this.propertyRepository.save(property);
  }
}
