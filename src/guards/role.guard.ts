import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles: ' + roles);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    request.user = { roles: 'customer' };
    return roles.includes(request.user.roles);
  }
}
