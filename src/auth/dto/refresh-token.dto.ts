import { IsString, Length, IsNotEmpty } from 'class-validator';

export class RefereshTokenDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  token: string;
}
