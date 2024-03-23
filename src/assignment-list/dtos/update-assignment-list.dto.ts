import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAssignmentListDto {
  @ApiProperty({ description: 'Lista Editada com sucesso', example: 'Lista01' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  name: string;
}
