import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDTO, UpdatePropertyDTO } from './property.dto';
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
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['region'],
    });

    if (!property) {
      throw new NotFoundException(`Property with id ${id} was not found!`);
    }
    return property;
  }

  //Create a property
  async create(createPropertyBody: CreatePropertyDTO): Promise<Property> {
    try {
      const newProperty = this.propertyRepository.create(createPropertyBody);
      return await this.propertyRepository.save(newProperty);
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }
  }

  //Update a property
  async update(updateProperty: UpdatePropertyDTO): Promise<Property> {
    const property = await this.propertyRepository.update(
      updateProperty.id,
      updateProperty,
    );
    if (!property) {
      throw new NotFoundException(
        `Property with id ${updateProperty.id} was not found. Therefore, unable to make update!`,
      );
    }
    return await this.propertyRepository.findOne({
      where: { id: updateProperty.id },
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
