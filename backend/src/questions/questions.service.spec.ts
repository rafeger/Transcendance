import {Test, TestingModule} from '@nestjs/testing';
import {QuestionsService} from './questions.service.js';
import {PrismaService} from '../prisma/prisma.service.js';
import {QuestionsService, QuestionRow} from './questions.service.js'

const rows : QuestionRow [] = {
	{0, 'catTest', 341, 'question1 text', 'EASY', 'MULTIPLE', 1341, 'q1answer1 text', false},
	{0, 'catTest', 341, 'question1 text', 'EASY', 'MULTIPLE', 2341, 'q1answer2 text', false},
	{0, 'catTest', 341, 'question1 text', 'EASY', 'MULTIPLE', 3341, 'q1answer3 text', true},
	{0, 'catTest', 341, 'question1 text', 'EASY', 'MULTIPLE', 4341, 'q1answer4 text', false},
	{1, 'catTest', 241, 'question2 text', 'MEDIUM', 'BOOLEAN', 1241, 'q2answer1 text', false},
	{1, 'catTest', 241, 'question2 text', 'MEDIUM', 'BOOLEAN', 2241, 'q2answer2 text', true},
}

describe('QuestionsService', () => { //regroupe tous les tests du service
	let service: QuestionsService; //variable partagee par tous les tests du groupe
	
	beforeEach(async () => {//s'execute avant chaque it: chaque test repart d'un service neuf, sans etre incluence par le precedent
		const module: TestingModule = await Test.createTestingModule({//fabrique un petit module NestJS de test qui ne contient que ce qui est liste 
			providers: [
				QuestionsService, 
				{provide: PrismaService, useValue:{}},//quand on demande PrismaService donne cet objet a la place (le faux Prisma)
			],
		}).compile();//NestJS assemble le module et fait les injections
		service = module.get<QuestionsService>(QuestionsService); recupere le service avec le faux Prisma
	});
	
	it('should be defined', () => {//un test aui verifie que le service a pu etre cree
		expect(service).toBeDefined();
	});
});