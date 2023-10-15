import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'cratfer98', description: 'Никнейм пользователя'})
  @IsNotEmpty({ message: 'Никнейм - обязательное поле' })
  @IsString({ message: 'Никнейм должен быть строкой' })
  @Length(3, 20, { message: 'Никнейм должен быть не меньше 3 и не больше 20 символов' })
  name: string;

  @ApiProperty({ example: 'test_password_123', description: 'Пароль пользователя'})
  @IsNotEmpty({ message: 'Пароль - обязательное поле' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(8, 20, { message: 'Пароль должен быть не меньше 8 и не больше 20 символов' })
  password: string;
}
