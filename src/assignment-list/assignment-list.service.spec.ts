import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentListService } from './assignment-list.service';

describe('AssignmentListService', () => {
  let service: AssignmentListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentListService],
    }).compile();

    service = module.get<AssignmentListService>(AssignmentListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
