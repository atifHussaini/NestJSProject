import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';
import {
  UpdateLeadDTO,
  CreateLeadDTO,
  CreateLeadDTOSchema,
  UpdateLeadDTOSchema,
} from './lead.dto';
import { validate } from '../utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('lead')
@ApiTags('Lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  //Get all leads
  @Get()
  async findAll(): Promise<Lead[]> {
    return await this.leadService.findAll();
  }

  //Get all leads sorted by leadScore
  @Get('/sorted-leadScore')
  async findAllSortedLeadScore() {
    return await this.leadService.findAllSortedLeadScore();
  }

  //Get all leads sorted by created_at
  @Get('/sorted-createdAt')
  async findAllSortedCreatedAt() {
    return await this.leadService.findAllSortedCreatedAt();
  }

  //Get a lead
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lead> {
    return await this.leadService.findOne(id);
  }

  //Create a lead
  @Post()
  @ApiBody({
    schema: {
      properties: {
        contactInfo: { type: 'string' },
        propertyId: { type: 'string' },
        leadScore: { type: 'number' },
      },
    },
  })
  async create(@Body() body: CreateLeadDTO): Promise<Lead> {
    validate(body, CreateLeadDTOSchema);
    return await this.leadService.create(body);
  }

  //Update a lead
  @Patch()
  @ApiBody({
    schema: {
      properties: {
        contactInfo: { type: 'string' },
        propertyId: { type: 'string' },
        leadScore: { type: 'number' },
        id: { type: 'string' },
      },
    },
  })
  async update(@Body() body: UpdateLeadDTO): Promise<Lead> {
    validate(body, UpdateLeadDTOSchema);
    return this.leadService.update(body);
  }

  //Delete a lead
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Lead> {
    return this.leadService.delete(id);
  }
}
