import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  //Get one lead
  async findOne(id: number): Promise<Lead> {
    return await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  //Get all sorted by lead score
  async findAllSortedLeadScore(leadScore: number): Promise<Lead[]> {
    return await this.leadRepository.find({
      order: {
        [leadScore]: 'ASC',
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
  async create(lead: Lead): Promise<Lead> {
    const newLead = this.leadRepository.create(lead);
    return await this.leadRepository.save(newLead);
  }

  //Update a lead
  async update(id: number, updateLead: Lead): Promise<Lead> {
    await this.leadRepository.update(id, updateLead);
    return await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  //Delete a lead
  async delete(id: number): Promise<void> {
    await this.leadRepository.delete(id);
  }
}
