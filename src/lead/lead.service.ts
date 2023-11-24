import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UpdateLeadDTO, CreateLeadDTO } from './lead.dto';
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
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!lead) {
      throw new NotFoundException(`Lead with id ${id} was not found!`);
    }
    return lead;
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
  async create(lead: CreateLeadDTO): Promise<Lead> {
    try {
      const newLead = this.leadRepository.create(lead);
      return await this.leadRepository.save(newLead);
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }
  }

  //Update a lead
  async update(updateLead: UpdateLeadDTO): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id: updateLead.id },
    });
    if (!lead) {
      throw new NotFoundException(
        `Region with id ${updateLead.id} was not found!`,
      );
    }

    try {
      await this.leadRepository.update(
        { id: updateLead.id, deleted_at: IsNull() },
        updateLead,
      );
      return await this.leadRepository.findOne({
        where: { id: updateLead.id },
        relations: ['property'],
      });
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }
  }

  //Delete a lead
  async delete(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with id ${id} not found!`);
    }
    lead.deleted_at = new Date();
    return await this.leadRepository.save(lead);
  }
}
