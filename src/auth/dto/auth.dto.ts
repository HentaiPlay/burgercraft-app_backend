import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'cratfer98', description: 'Никнейм пользователя'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 20, { message: 'Не меньше 3 и не больше 20 символов' })
  name: string;

  @ApiProperty({ example: 'test_password_123', description: 'Пароль пользователя'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 20, { message: 'Не меньше 8 и не больше 20 символов' })
  password: string;
}
