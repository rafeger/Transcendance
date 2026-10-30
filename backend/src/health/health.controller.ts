import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    async check(): Promise<{ status: string; database: string}> {
        const databaseUp = await this.healthService.isDatabaseUp();

        if (!databaseUp){
            throw new ServiceUnavailableException({ status: 'error', database: 'down'});
            //503 -not available
        }
        return { status: 'ok', database: 'up'};
    }
}