import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateRegionDTO } from './region.dto';

describe('RegionService', () => {
  let service: RegionService;
  let repository: Repository<Region>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: getRepositoryToken(Region),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RegionService>(RegionService);
    repository = module.get<Repository<Region>>(getRepositoryToken(Region));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll: should find all regions', async () => {
    const region1 = new Region();
    region1.id = '6';
    const region2 = new Region();
    region2.id = '7';
    jest.spyOn(repository, 'find').mockResolvedValueOnce([region1, region2]);

    const result = await service.findAll();
    expect(result).toEqual([region1, region2]);
  });

  it('findOne: should find a region', async () => {
    const region = new Region();
    region.id = '6';
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(region);

    const result = await service.findOne('6');
    expect(result).toEqual(region);
  });

  it('create: should create a region', async () => {
    const createRegionBody = {
      name: 'Test',
      description: 'Description',
    };

    const region = new Region();
    region.name = createRegionBody.name;
    region.description = createRegionBody.description;

    const createSpy = jest.spyOn(repository, 'create').mockReturnValue(region);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(region);
    const newRegion = await service.create(createRegionBody);

    expect(createSpy).toHaveBeenCalledWith(createRegionBody);
    expect(saveSpy).toHaveBeenCalledWith(region);
    expect(newRegion).toEqual(region);
  });

  it('should update a region', async () => {
    const updateRegion: UpdateRegionDTO = {
      id: 'id',
      name: 'name',
      description: 'description',
    };

    const existingRegion: Region = {
      id: '1',
      name: 'Midwest',
      description: 'Michigan, Ohio, Indiana, Illinois',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      properties: [],
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(existingRegion);
    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue(undefined);

    const result = await service.update(updateRegion);
    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(result).toEqual(existingRegion);
  });

  it('should throw NotFoundException when region is not found', async () => {
    const updateRegion: UpdateRegionDTO = {
      id: 'non-existent-id',
      name: 'no name',
      description: 'no description',
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(undefined);
    await expect(service.update(updateRegion)).rejects.toThrowError(
      NotFoundException,
    );
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should throw BadRequestException on update failure', async () => {
    const updateRegion: UpdateRegionDTO = {
      id: 'id',
      name: 'name',
      description: 'description',
    };

    const existingRegion: Region = {
      id: '1',
      name: 'Midwest',
      description: 'Michigan, Ohio, Indiana, Illinois',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      properties: [],
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(existingRegion);
    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockRejectedValueOnce(new Error('update error message'));

    await expect(service.update(updateRegion)).rejects.toThrowError(
      BadRequestException,
    );
    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('delete: should delete and set the soft delete', async () => {
    const region = new Region();
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(region);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(region);
    const result = await service.delete(region.id);
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
