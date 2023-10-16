import { UnsupportedMediaTypeException } from '@nestjs/common';
import { ProductType } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { generateSlug } from '../helpers/slug-generator';

export const ImageFileFilter = (
  req: any,
  file: any,
  callback: (error: Error, acceptFile: boolean) => any,
) => {
  if (!file.originalname.match(/\.(jpg|png)$/)) {
    return callback(
      new UnsupportedMediaTypeException(
        'Не поддерживаемый формат изображения [Допустимо: jpg/png]',
      ),
      false,
    );
  }
  return callback(null, true);
};

export const AvatarFileInterceptorOptions = {
  storage: diskStorage({
    destination: './files/images/avatars',
    filename: (req: any, file: any, callback: any) => {
      const uniqueSuffix: string =
        Date.now() + '_' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: ImageFileFilter,
};

export const ProductFileInterceptorOptions = {
  storage: diskStorage({
    destination: function(req: any, file: any, callback: any) {
      const productType: ProductType = JSON.parse(req.body.data).type
      callback(null, `./files/images/static/products/${productType}s`);
    },
    filename: (req: any, file: any, callback: any) => {
      const productName = JSON.parse(req.body.data).name
      const slug = generateSlug(productName)
      const ext = extname(file.originalname);
      const filename = `${slug}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: ImageFileFilter,
};