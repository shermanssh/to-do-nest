import { ReturnAssignmentDto } from 'src/assignments/dtos';
import { AssignmentListEntity } from '../entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnAssignmentListDto {
  @ApiProperty({
    example: '0e540daf-c9a1-48d4-8f9c-c4c5ba5f382e',
    description: 'Identificador único da lista de atribuições'
  })
  id: string;

  @ApiProperty({
    example: 'Minha Lista de Atribuições',
    description: 'Nome da lista de atribuições'
  })
  name: string;

  @ApiProperty({
    type: ReturnAssignmentDto,
    isArray: true,
    example: [
      {
        id: '0e540daf-c9a1-48d4-8f9c-c4c5ba5f382e',
        description: 'Descrição da atribuição',
        deadLine: '2024-01-05T12:00:00.000Z',
        concludeAt: '2024-01-05T14:30:00.000Z',
        assignmentListId: '1',
        concluded: false
      }
    ],
    description: 'Atribuições associadas à lista (pode ser vazio)'
  })
  assignments?: ReturnAssignmentDto[];

  constructor(assignmentListEntity: AssignmentListEntity) {
    this.id = assignmentListEntity.id;
    this.name = assignmentListEntity.name;
    this.assignments = assignmentListEntity.assignments
      ? assignmentListEntity.assignments.map(
          (assignment) => new ReturnAssignmentDto(assignment)
        )
      : undefined;
  }
}
