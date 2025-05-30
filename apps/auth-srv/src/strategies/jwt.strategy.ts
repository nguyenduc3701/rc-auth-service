import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';

interface RequestWithAuth extends Request {
  Authentication?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithAuth): string | null =>
          (request?.cookies as { Authentication?: string })?.Authentication ||
          request?.Authentication ||
          null,
      ]),
      secretOrKey: secret,
    });
  }
  async validate({ userId }: TokenPayload) {
    return await this.userService.getUser({ _id: userId });
  }
}
