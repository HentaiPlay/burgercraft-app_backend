import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!roles) {
        return false;
      }
      const request = context.switchToHttp().getRequest();
      const userRole = request.user.role
      return this.validateRoles(roles, userRole);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Нет доступа для данной роли',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some((role) => userRoles.includes(role));
  }
}
