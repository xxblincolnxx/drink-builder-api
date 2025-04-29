import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../../utilities/types/UserDto';

const getCurrentUserByContext = (context: ExecutionContext): UserDto =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator<UserDto>(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
