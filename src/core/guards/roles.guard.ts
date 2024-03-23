import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { loginPayloadDto } from 'src/auth/dtos';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from 'src/user/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authorization.replace('Bearer ', '');

    const loginPayload: loginPayloadDto | undefined = await this.jwtService
      .verifyAsync(token, { secret: process.env.JWT_SECRET })
      .catch(() => undefined);

    if (!loginPayload) {
      throw new UnauthorizedException('Unauthorized');
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}
