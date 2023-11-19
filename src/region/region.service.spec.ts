import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { Repository } from 'typeorm';

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

  it('should find a region', async () => {
    const region = new Region();
    region.id = '6';
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(region);

    const result = await service.findOne('6');

    expect(result).toEqual(region);
  });
});
