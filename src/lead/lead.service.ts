import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadCreatePayload, LeadUpdatePayload } from './lead.dto';
import { Lead } from './lead.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  //Get all leads
  async findAll(): Promise<Lead[]> {
    return await this.leadRepository.find({ relations: ['property'] });
  }

  //Get a lead
  async findOne(id: string): Promise<Lead> {
    return await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  //Get all sorted by lead score
  async findAllSortedLeadScore(): Promise<Lead[]> {
    return await this.leadRepository.find({
      order: {
        leadScore: 'ASC',
      },
    });
  }

  //Get all sorted by creation date
  async findAllSortedCreatedAt(): Promise<Lead[]> {
    return await this.leadRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
  }

  //Create a lead
  async create(lead: LeadCreatePayload): Promise<Lead> {
    const newLead = this.leadRepository.create(lead);
    return await this.leadRepository.save(newLead);
  }

  //Update a lead
  async update(id: string, updateLead: LeadUpdatePayload): Promise<Lead> {
    await this.leadRepository.update(id, updateLead);
    return await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  //Delete a lead
  async delete(id: string): Promise<void> {
    const lead = await this.leadRepository.findOne({ where: { id } });

    if (!lead) {
      throw new NotFoundException(`Lead with id ${id} not found!`);
    }

    lead.deleted_at = new Date();
    await this.leadRepository.save(lead);
  }
}
