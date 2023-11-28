import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionController } from './region.controller';
import { Region } from './region.entity';
import { RegionService } from './region.service';

describe('RegionController', () => {
  let controller: RegionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: getRepositoryToken(Region),
          useClass: Repository,
        },
      ],
      controllers: [RegionController],
    }).compile();

    controller = module.get<RegionController>(RegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

