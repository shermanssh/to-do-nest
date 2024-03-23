import { ApiProperty } from '@nestjs/swagger';

export class ReturnUnconcludeAssignmentSwagger {
  @ApiProperty({ example: 'string' })
  id: string;

  @ApiProperty({ example: 'string' })
  description: string;

  @ApiProperty({ example: '1970-01-01T00:00:00.761Z' })
  deadLine: string;

  @ApiProperty({ example: 'string' })
  assignmentListId: string;

  @ApiProperty({ example: false })
  concluded: boolean;

  @ApiProperty({ example: '2024-01-04T23:47:06.762Z' })
  createAt: string;

  @ApiProperty({ example: '2024-01-04T23:47:06.762Z' })
  updateAt: string;
}
