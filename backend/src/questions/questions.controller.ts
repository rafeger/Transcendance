import {
  Controller,
  Get,
} from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { Public } from '../auth/public.decorator.js';

@Controller('categories')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @Public() //permet que  la liste des categories soit accessible avant connection, a supprimer sinon
  getCategories() {
    return this.questionsService.getCategories();
  }
}





//GET /api/categories avec le nombre de questions disponibles par catégorie et par difficulté