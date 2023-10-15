import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusType } from '@prisma/client';

export class SwitchStatusOrderDto {
  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  id: number;

  @ApiProperty({ example: 'ready', description: 'Новый статус заказа' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(StatusType, { message: 'Несуществующий статус' })
  status: StatusType;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  crafterId: number;
}
