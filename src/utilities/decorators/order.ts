import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Order = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { crafterId: request.user.id, ...request.body }
  },
);