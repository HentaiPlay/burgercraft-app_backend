import {
  IsOptional,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatsDto {

  @ApiProperty({ example: false, description: 'Сумма последнего заказа' })
  @IsOptional()
  @IsInt({ message: 'Сумма последнего заказа должна быть числом' })
  summ: number

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Идентификатор пользователя должен быть числом' })
  crafterId: number;
}
