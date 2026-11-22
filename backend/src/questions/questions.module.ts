import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';

@Module({
  providers: [QuestionsService, PrismaService],
  exports: [QuestionsService],
})
export class QuestionsModule {}