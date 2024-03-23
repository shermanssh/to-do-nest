import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { UserEntity } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined
    );

    if (user) {
      throw new ConflictException('Email já registrado ');
    }

    const { password, confirmPassword } = createUserDto;

    if (password != confirmPassword || password.length < 8) {
      throw new UnprocessableEntityException('As senhas não coincidem');
    }

    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);
    const confirmPasswordHashed = await hash(
      createUserDto.confirmPassword,
      saltOrRounds
    );

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
      confirmPassword: confirmPasswordHashed,
      typeUser: 1
    });
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      throw new NotFoundException(`users not found`);
    }

    return users;
  }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        assigmentList: {
          assignments: true
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`user not found for userId ${userId}`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new NotFoundException(`user not found with email ${email}`);
    }

    return user;
  }
}
