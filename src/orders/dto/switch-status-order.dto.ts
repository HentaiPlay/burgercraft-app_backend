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
  @IsNotEmpty({ message: 'Идентификатор заказа - обязательное поле' })
  @IsInt({ message: 'Идентификатор заказа должен быть числом' })
  id: number;

  @ApiProperty({ example: 'ready', description: 'Новый статус заказа' })
  @IsNotEmpty({ message: 'Статус заказа - обязательное поле'})
  @IsString({ message: 'Статус заказа должен быть строкой' })
  @IsEnum(StatusType, { message: 'Несуществующий статус заказа' })
  status: StatusType;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Идентификатор пользователя - обязательное поле' })
  @IsInt({ message: 'Идентификатор пользователя должен быть числом' })
  crafterId: number;
}
