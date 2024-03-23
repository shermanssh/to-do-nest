import { ApiProperty } from '@nestjs/swagger';

export class ReturnNotFoundAssignments {
  @ApiProperty({
    example: 'assignments not found',
    description: 'Mensagem de erro quando as atribuições não são encontradas'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Tipo de erro quando as atribuições não são encontradas'
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP para Não Encontrado'
  })
  statusCode: number;
}

export class ReturnOneNotFoundAssignment {
  @ApiProperty({
    example:
      'assignment not found with Id 0e540daf-c9a1-48d4-8f9c-c4c5ba5f382e',
    description:
      'Mensagem de erro quando uma atribuição específica não é encontrada'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description:
      'Tipo de erro quando uma atribuição específica não é encontrada'
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP para Não Encontrado'
  })
  statusCode: number;
}
