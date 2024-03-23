import { ApiProperty } from '@nestjs/swagger';
import { AssignmentEntity } from '../entity';

export class ReturnAssignmentDto {
  @ApiProperty({
    example: '0e540daf-c9a1-48d4-8f9c-c4c5ba5f382e',
    description: 'Identificador único da atribuição'
  })
  id: string;

  @ApiProperty({
    example: 'Descrição da atribuição',
    description: 'Descrição da atribuição'
  })
  description: string;

  @ApiProperty({
    example: '2024-01-05T12:00:00.000Z',
    description: 'Data limite da atribuição'
  })
  deadLine: Date;

  @ApiProperty({
    example: '2024-01-05T14:30:00.000Z',
    description: 'Data de conclusão da atribuição'
  })
  concludeAt: Date;

  @ApiProperty({
    example: '0e540daf-c9a1-48d4-8f9c-c4c5ba5f382t',
    description: 'Identificador único da lista de atribuições associada'
  })
  assignmentListId: string;

  @ApiProperty({
    example: 'exampleList',
    description: 'Nome da lista'
  })
  assignmentListName: string;

  @ApiProperty({
    example: false,
    description: 'Indica se a atribuição foi concluída ou não'
  })
  concluded: boolean;

  constructor(assignment: AssignmentEntity) {
    this.id = assignment.id;
    this.description = assignment.description;
    this.deadLine = assignment.deadLine;
    this.assignmentListId = assignment.assignmentListId;
    this.assignmentListName = assignment.assignmentListName;
    this.concluded = assignment.concluded;
    this.concludeAt = assignment.concludeAt;
  }
}
