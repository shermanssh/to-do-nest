import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDto {
  @ApiProperty({
    example: '6143e572-d0c3-476d-a853-a047a3f18c94',
    description: 'Identificador único do usuário'
  })
  id: string;

  @ApiProperty({
    example: 'exampleUser',
    description: 'Nome do usuário'
  })
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Endereço de e-mail do usuário'
  })
  email: string;
}

export class ReturnUserLoggedSwagger {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDNlNTcyLWQwYzMtNDc2ZC1hODUzLWEwNDdhM2YxOGM5NCIsInR5cGVVc2VyIjoxLCJpYXQiOjE3MDQ0ODA4NzQsImV4cCI6MTcwNDQ4NDQ3NH0.WEiis2yte5C4L1B3nOtc-_AF8L1utSU0La5p1tp2Fwo',
    description: 'Token de acesso do usuário logado'
  })
  accessToken: string;

  @ApiProperty({
    type: ReturnUserDto,
    description: 'Informações do usuário logado'
  })
  user: ReturnUserDto;
}
