import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Идентификатор пользователя - обязательное поле' })
  @IsInt({ message: 'Идентификатор пользователя должен быть числом' })
  id: number;

  @ApiProperty({ example: 'default.png', description: 'При создании пользователя нельзя выбрать аватар, поэтому устновится дефолтный'})
  @IsOptional()
  @IsString({ message: 'Название файла должно быть строкой' })
  avatar: string;
}
