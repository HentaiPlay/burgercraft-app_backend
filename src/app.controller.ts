import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AppController')
@Controller()
export class AppController {
    private start: number;

    constructor() {
        this.start = Date.now();
    }

    @ApiOperation({ summary: 'Проверка работоспособности приложения' })
    @Get('healthcheck')
    async healthcheck() {
        const now = Date.now();
        return {
            status: 'API Online',
            uptime: Number((now - this.start) / 1000).toFixed(0),
        };
    }
}