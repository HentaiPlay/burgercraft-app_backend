import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  token: string;
}
