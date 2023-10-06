import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate } from 'class-validator';
import { AuthDto } from 'src/auth/dto/auth.dto';

export class CreateUserDto extends AuthDto {
  @ApiProperty({ example: 'default.png', description: 'При создании пользователя нельзя выбрать аватар, поэтому устновится дефолтный'})
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  avatar: string;

  @ApiProperty({ example: 1, description: 'Id роли пользователя'})
  @IsOptional()
  @IsInt({ message: 'Должно быть числом' })
  roleId: number;

  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  createdAt: Date;
}
