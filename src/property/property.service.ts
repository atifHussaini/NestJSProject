import { Injectable } from '@nestjs/common';
import { InjectRespository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRespository(Property)
    private propertyRespository: Repository<Property>,
  ) {}

  //Create a property
  async create(data: { address: string, data: JSON, regionId: number}): Promise<Property> {
    const newProperty = this.propertyRespository.create(data);
    return await this.propertyRespository.save(newProperty);
  }

}
