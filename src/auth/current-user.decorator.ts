import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/dto/create-user.request';
const getCurrentUserByContext = (context: ExecutionContext): User =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator<User>(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
