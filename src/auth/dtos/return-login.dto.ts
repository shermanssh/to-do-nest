import { ReturnUserDto } from 'src/user/dtos';

export class ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
