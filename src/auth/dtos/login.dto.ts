import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'O nome da tarefa deve ter no máximo 255 caracteres.'
  })
  password: string;
}
