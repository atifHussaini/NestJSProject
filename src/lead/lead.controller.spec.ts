import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadController } from './lead.controller';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';

describe('LeadController', () => {
  let controller: LeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(Lead),
          useClass: Repository,
        },
      ],
      controllers: [LeadController],
    }).compile();

    controller = module.get<LeadController>(LeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
