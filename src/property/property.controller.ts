import { Controller, Post, Body, Param } from '@nestjs/common';
import { PropertyService } from './property.service'
import { Property } from './property.entity';

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    //Create property with regionId
    @Post()
    async create(@Body() data: { address: string, data: string, regionId: number}) {
        return this.propertyService.create(data);
    }
}
