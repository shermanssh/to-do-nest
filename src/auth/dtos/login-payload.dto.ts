import { UserEntity } from 'src/user/entity';

export class loginPayloadDto {
  id: string;
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}
