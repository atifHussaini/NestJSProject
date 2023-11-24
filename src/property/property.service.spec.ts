import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lead } from '../lead/lead.entity';
import { Region } from '../region/region.entity';
import { Repository } from 'typeorm';
import { UpdatePropertyDTO } from './property.dto';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

describe('PropertyService', () => {
  let service: PropertyService;
  let repository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    repository = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll: should find all properties', async () => {
    const property1 = new Property();
    property1.id = '1';
    const property2 = new Property();
    property2.id = '2';
    jest
      .spyOn(repository, 'find')
      .mockResolvedValueOnce([property1, property2]);

    const result = await service.findAll();
    expect(result).toEqual([property1, property2]);
  });

  it('findOne: should find a property', async () => {
    const property = new Property();
    property.id = '1';
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(property);

    const result = await service.findOne('1');
    expect(result).toEqual(property);
  });

  it('create: should create a propety', async () => {
    const createPropertyBody = {
      address: 'Test Address',
      data: { id: 'test data' },
      regionId: 'id',
    };

    const property = new Property();
    property.address = createPropertyBody.address;
    property.data = createPropertyBody.data;

    const createSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(property);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(property);
    const newProperty = await service.create(createPropertyBody);

    expect(createSpy).toHaveBeenCalledWith(createPropertyBody);
    expect(saveSpy).toHaveBeenCalledWith(property);
    expect(newProperty).toEqual(property);
  });

  it('should update a property', async () => {
    const updateProperty: UpdatePropertyDTO = {
      id: 'id',
      address: 'address',
      data: { data: 'description' },
      regionId: 'mockId',
    };

    const existingProperty: Property = {
      id: '1',
      address: '1234 South',
      data: { data: 'imaginary data' },
      regionId: 'realId',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      region: new Region(),
      lead: new Lead(),
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(existingProperty);
    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue(undefined);

    const result = await service.update(updateProperty);
    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(result).toEqual(existingProperty);
  });

  it('should throw NotFoundException when property is not found', async () => {
    const updateProperty: UpdatePropertyDTO = {
      id: 'non-existent-id',
      address: 'no address',
      data: { data: 'no data' },
      regionId: 'non-existent-region',
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(undefined);
    await expect(service.update(updateProperty)).rejects.toThrow(
      NotFoundException,
    );
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should throw BadRequestException on update failure', async () => {
    const updateRegion: UpdatePropertyDTO = {
      id: 'id',
      address: 'name',
      data: { data: 'no data' },
      regionId: 'non-existent-id',
    };

    const existingProperty: Property = {
      id: '1',
      address: '1234 South',
      data: { data: 'imaginary data' },
      regionId: 'realId',
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      region: new Region(),
      lead: new Lead(),
    };

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(existingProperty);
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
    const property = new Property();
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(property);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(property);
    const result = await service.delete(property.id);
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
