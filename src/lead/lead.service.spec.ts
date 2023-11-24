import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from '../property/property.entity';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';
import { UpdateLeadDTO } from './lead.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('LeadService', () => {
  let service: LeadService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(Lead),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll: should find all leads', async () => {
    const lead1 = new Lead();
    lead1.id = '6';
    const lead2 = new Lead();
    lead2.id = '7';
    jest.spyOn(repository, 'find').mockResolvedValueOnce([lead1, lead2]);

    const result = await service.findAll();
    expect(result).toEqual([lead1, lead2]);
  });

  it('findOne: should find a lead', async () => {
    const lead = new Lead();
    lead.id = '2';
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(lead);

    const result = await service.findOne('2');
    expect(result).toEqual(lead);
  });

  it('create: should create a lead', async () => {
    const createLeadBody = {
      contactInfo: 'contact test',
      leadScore: 4,
      propertyId: '1',
    };

    const lead = new Lead();
    lead.contactInfo = createLeadBody.contactInfo;
    lead.leadScore = createLeadBody.leadScore;

    const createSpy = jest.spyOn(repository, 'create').mockReturnValue(lead);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(lead);
    const newLead = await service.create(createLeadBody);

    expect(createSpy).toHaveBeenCalledWith(createLeadBody);
    expect(saveSpy).toHaveBeenCalledWith(lead);
    expect(newLead).toEqual(lead);
  });

  it('should update a lead', async () => {
    const updateLead: UpdateLeadDTO = {
      id: 'id',
      contactInfo: 'Update contact info',
      leadScore: 9,
      propertyId: 'Update property Id',
    };

    const existingLead: Lead = {
      id: 'id',
      contactInfo: 'Existing contact info',
      leadScore: 50,
      propertyId: 'Existing property id',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      property: new Property(),
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(existingLead);
    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue(undefined);

    const result = await service.update(updateLead);
    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(result).toEqual(existingLead);
  });

  it('should throw NotFoundException when lead is not found', async () => {
    const updateLead: UpdateLeadDTO = {
      id: 'non existent id',
      contactInfo: 'non existent contact info',
      leadScore: 9,
      propertyId: 'non existent property Id',
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(undefined);
    await expect(service.update(updateLead)).rejects.toThrow(NotFoundException);
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should throw BadRequestException on update failure', async () => {
    const updateRegion: UpdateLeadDTO = {
      id: 'id',
      contactInfo: 'contact info',
      leadScore: 5,
      propertyId: 'property Id',
    };

    const existingLead: Lead = {
      id: 'id',
      contactInfo: 'Existing contact info',
      leadScore: 50,
      propertyId: 'Existing property id',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      property: new Property(),
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(existingLead);
    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockRejectedValueOnce(new Error('update error message'));

    await expect(service.update(updateRegion)).rejects.toThrow(
      BadRequestException,
    );
    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('delete: should delete and set the soft delete', async () => {
    const lead = new Lead();
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(lead);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(lead);
    const result = await service.delete(lead.id);
    expect(findOneSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
    expect(result.deleted_at).not.toBe(null);
  });

  it('delete: should throw an error when deleting a non-existant id', async () => {
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(null);
    expect(async () => await service.delete('testId')).rejects.toThrow(
      NotFoundException,
    );
    expect(findOneSpy).toHaveBeenCalled();
  });
});
