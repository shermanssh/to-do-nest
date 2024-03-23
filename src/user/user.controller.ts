import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateReturnUserDto, CreateUserDto } from './dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('/register')
  @ApiOperation({ summary: 'Register account' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso',
    type: UserEntity
  })
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<CreateReturnUserDto> {
    return new CreateReturnUserDto(
      await this.userService.createUser(createUserDto)
    );
  }
}
