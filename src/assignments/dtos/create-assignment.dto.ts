import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({
    description: 'Data de Conclusão',
    example: '2030-01-01T03:00:00.000Z'
  })
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty({
    description: 'Id da Lista',
    example: 'f3758084-d9c9-4fab-9b81-d4eecc68cd9a'
  })
  @IsNotEmpty()
  @IsString()
  assignmentListId: string;

  @ApiProperty({
    description: 'Descrição da Tarefa',
    example: 'Uma Descrição para uma Tarefa'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  description: string;
}
