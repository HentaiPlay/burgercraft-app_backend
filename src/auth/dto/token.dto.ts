import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NjU5NjU5OSwiZXhwIjoxNjk2NjAwMTk5fQ.1X4hM8DrwVGpMuiGLM3bXUmhS28GJmX79fka1VPEGJ8',
    description: 'Рефреш токен для получения новой пары'
  })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  token: string;
}
