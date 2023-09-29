import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const ImageFileFilter = (
  req: any,
  file: any,
  callback: (error: Error, acceptFile: boolean) => any,
) => {
  if (!file.originalname.match(/\.(jpg|png)$/)) {
    return callback(
      new UnsupportedMediaTypeException('Не поддерживаемый формат изображения [Допустимо: jpg/png]'),
      false,
    );
  }
  return callback(null, true);
};

const AvatarFileInterceptorOptions = {
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

export { AvatarFileInterceptorOptions, ImageFileFilter };
