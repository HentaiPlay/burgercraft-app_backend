import { Controller } from '@nestjs/common';
import { BurgersService } from './burgers.service';

@Controller('burgers')
export class BurgersController {
  constructor(private readonly burgersService: BurgersService) {}
}
