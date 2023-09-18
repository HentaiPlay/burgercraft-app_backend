import { IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 20, { message: 'Не меньше 8 и не больше 20' })
  name: string;

  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 20, { message: 'Не меньше 8 и не больше 20' })
  password: string;
}
