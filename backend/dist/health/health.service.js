var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HealthService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let HealthService = HealthService_1 = class HealthService {
    prisma;
    logger = new Logger(HealthService_1.name, { timestamp: true });
    constructor(prisma) {
        this.prisma = prisma;
    }
    async isDatabaseUp() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch {
            return false;
        }
    }
};
HealthService = HealthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], HealthService);
export { HealthService };
//# sourceMappingURL=health.service.js.map