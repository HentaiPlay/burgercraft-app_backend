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
