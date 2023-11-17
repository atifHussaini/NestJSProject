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

  @Post()
  async create(@Body() lead: Lead): Promise<Lead> {
    return await this.leadService.create(lead);
  }

  //Update a lead
  @Put(':id')
  async update(@Param('id') id: string, @Body() lead: Lead): Promise<Lead> {
    return this.leadService.update(Number(id), lead);
  }

  //Delete a lead
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    //handle the error if the lead not found
    const lead = await this.leadService.findOne(Number(id));
    if (!lead) {
      throw new Error('Lead not found!!');
    }
    return this.leadService.delete(Number(id));
  }
}
