import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity';
import { LoginDto, ReturnLoginDto, loginPayloadDto } from './dtos';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginUser: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginUser.email)
      .catch(() => undefined);

    const isMatch = await compare(loginUser.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email ou senha inválida');
    }

    return {
      accessToken: this.jwtService.sign({ ...new loginPayloadDto(user) }),
      user: new ReturnUserDto(user)
    };
  }
}
