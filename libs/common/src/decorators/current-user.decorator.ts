import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'apps/auth-srv/src/users/models/users.schema';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: UserDocument;
}

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
