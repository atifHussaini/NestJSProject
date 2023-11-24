import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyController } from './property.controller';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

describe('PropertyController', () => {
  let controller: PropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property),
          useClass: Repository,
        },
      ],
      controllers: [PropertyController],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
