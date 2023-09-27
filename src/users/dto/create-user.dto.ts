import { IsString, IsInt, IsOptional, IsDate } from 'class-validator';
import { AuthDto } from 'src/auth/dto/auth.dto';

export class CreateUserDto extends AuthDto {
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  avatarPath: string;

  @IsOptional()
  @IsInt({ message: 'Должно быть числом' })
  roleId: number;

  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  createdAt: Date;
}
