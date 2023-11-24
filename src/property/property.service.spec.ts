import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

describe('PropertyService', () => {
  let service: PropertyService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
