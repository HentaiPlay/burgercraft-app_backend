import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  id: number;
}
