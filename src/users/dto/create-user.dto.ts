import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { AuthDto } from 'src/auth/dto/auth.dto';

export class CreateUserDto extends AuthDto {
  @ApiProperty({ example: 1, description: 'Идентификатор роли'})
  @IsOptional()
  @IsInt({ message: 'Идентификато роли должен быть числом' })
  roleId: number;
}
