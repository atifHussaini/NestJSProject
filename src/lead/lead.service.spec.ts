import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';

describe('LeadService', () => {
  let service: LeadService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
