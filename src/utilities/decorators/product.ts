import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProductPhoto = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const productData = request.body.data ? JSON.parse(request.body.data) : {}
    productData.fileName = request.file ? request.file.filename : null
    return productData
  },
);