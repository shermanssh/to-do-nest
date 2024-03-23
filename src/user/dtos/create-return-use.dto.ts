import { UserEntity } from '../entity';

export class CreateReturnUserDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.password = userEntity.password;
    this.confirmPassword = userEntity.confirmPassword;
    this.id = userEntity.id;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
  }
}
