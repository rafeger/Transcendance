import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HealthService {
    constructor(private readonly prisma: PrismaService) {}
    // Promise - true or false
    async isDatabaseUp(): Promise<boolean> {
        try {
            // this.prisma 
            // $queryRaw from PrismaClient= select 1 easiest guy 
            await this.prisma.$queryRaw`SELECT 1`;
            return true;
        }
        catch {
            return false;
        }
    }
}
