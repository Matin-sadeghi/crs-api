/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanActivate } from '@nestjs/common/interfaces';
import { UserDocument } from 'src/user/database/schema/user.schema';

export const UseAuth = (
  ...guards: (CanActivate | Function)[]
): MethodDecorator & ClassDecorator => {
  return applyDecorators(UseGuards(...guards), ApiBearerAuth());
};

/**
 * Decorator to get the current authenticated user from request
 * @param data - Optional property name to extract from user object
 * @example
 * @Get()
 * getProfile(@User() user: UserDocument) {
 *   return user;
 * }
 *
 * @Get()
 * getUserId(@User('_id') userId: string) {
 *   return userId;
 * }
 */
export const User = createParamDecorator(
  (data: keyof UserDocument | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{
      user?: UserDocument;
    }>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
