import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { LoginDto, ReturnLoginDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnUserLoggedSwagger } from './swagger';
import { ReturnUserLoginError } from './swagger/error';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'Usuário autenticado com sucesso',
    type: ReturnUserLoggedSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Erro de autenticação',
    type: ReturnUserLoginError
  })
  async login(@Body() loginUser: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginUser);
  }
}
