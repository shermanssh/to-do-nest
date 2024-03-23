import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Validate,
  MaxLength,
  ValidationArguments
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome de Usuário',
    example: 'userExample'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Email de Usuário',
    example: 'example@gmail.com'
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email: string;

  @ApiProperty({
    description: 'Senha de Usuário',
    example: 'example123'
  })
  @IsNotEmpty()
  @Matches(/^.{8,}$/, {
    message: 'A senha deve ter no mínimo 8 caracteres.'
  })
  @MaxLength(255, { message: 'A senha deve ter no máximo 255 caracteres.' })
  password: string;

  @ApiProperty({
    description: 'Senha de Confirmação',
    example: 'example123'
  })
  @IsNotEmpty()
  @IsString()
  @Validate(
    (value, args: ValidationArguments) => {
      const confirmPassword = value;
      const password = (args.object as CreateUserDto).password;
      return (
        password === confirmPassword &&
        value.length >= 8 &&
        password.length >= 8
      );
    },
    {
      message: 'As senhas não coincidem ou têm menos de 8 caracteres.'
    }
  )
  @MaxLength(255, {
    message: 'A confirmação de senha deve ter no máximo 255 caracteres.'
  })
  confirmPassword: string;
}
