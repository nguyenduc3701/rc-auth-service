import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { UserDto } from '../dto';

interface RequestWithUser extends Request {
  user?: UserDto;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const jwt = (request.cookies as { Authentication?: string })
      ?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((res) => {
          request.user = res;
        }),
        map(() => true),
      );
  }
}
