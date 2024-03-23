import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateAssignmentListDto {
  @ApiProperty({ description: 'Nome da Tarefa', example: 'exampleAssignment' })
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  name: string;
}
