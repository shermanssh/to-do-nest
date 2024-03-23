import { ApiProperty } from '@nestjs/swagger';

export class ReturnDeletedItemSwagger {
  @ApiProperty()
  raw: null[];
  @ApiProperty()
  affected: 1;
}
