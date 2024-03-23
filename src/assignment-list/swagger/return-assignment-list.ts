import { ApiProperty } from '@nestjs/swagger';
import { ReturnAssignmentListDto } from '../dtos';

export class ReturnAssignmentListSwagger {
  @ApiProperty({ type: ReturnAssignmentListDto, isArray: true })
  items: ReturnAssignmentListSwagger;
}
