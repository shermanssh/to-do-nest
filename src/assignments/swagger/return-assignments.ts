import { ApiProperty } from '@nestjs/swagger';
import { ReturnAssignmentDto } from '../dtos';

export class ReturnAssignmentsSwagger {
  @ApiProperty({ type: ReturnAssignmentDto, isArray: true })
  items: ReturnAssignmentsSwagger;
}
