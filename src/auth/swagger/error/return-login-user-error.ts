import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserLoginError {
  @ApiProperty({
    example: 'Email or password invalid',
    description: 'Mensagem de erro para credenciais inválidas'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Tipo de erro para Não Encontrado'
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP para Não Encontrado'
  })
  statusCode: number;
}
