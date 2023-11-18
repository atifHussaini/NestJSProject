import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';

@Controller('lead')
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
    //handle the error if lead does not exist
    const lead = await this.leadService.findOne(id);
    if (!lead) {
      throw new Error('Lead not found!!');
    } else {
      return lead;
    }
  }

  @Post()
  async create(@Body() lead: Lead): Promise<Lead> {
    return await this.leadService.create(lead);
  }

  //Update a lead
  @Put(':id')
  async update(@Param('id') id: string, @Body() lead: Lead): Promise<Lead> {
    return this.leadService.update(id, lead);
  }

  //Delete a lead
  @Delete(':id')
  async delete(@Param('id') id: string) {
    //handle the error if the lead not found
    const lead = await this.leadService.findOne(id);
    if (!lead) {
      throw new Error('Lead not found!!');
    }
    return this.leadService.delete(id);
  }
}
