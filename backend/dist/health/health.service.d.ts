import { PrismaService } from '../prisma/prisma.service.js';
export declare class HealthService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    isDatabaseUp(): Promise<boolean>;
}
