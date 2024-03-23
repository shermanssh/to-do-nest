import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatedAssignmentDto {
  @ApiProperty({ example: '2030-01-01T03:00:00.000Z' })
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty({ example: 'Descrição de tarefa' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  description: string;
}
