import {Test, TestingModule} from '@nestjs/testing';
import {PrismaService} from '../prisma/prisma.service.js';
import {QuestionsService, QuestionRow} from './questions.service.js'

const rows : QuestionRow [] = [
	{position:0, categoryName:'catTest', qId:341, question:'question1 text', difficulty:'EASY', type:'MULTIPLE', aId:1341, answer:'q1answer1 text', isCorrect:false},
	{position:0, categoryName:'catTest', qId:341, question:'question1 text', difficulty:'EASY', type:'MULTIPLE', aId:2341, answer:'q1answer2 text', isCorrect:false},
	{position:0, categoryName:'catTest', qId:341, question:'question1 text', difficulty:'EASY', type:'MULTIPLE', aId:3341, answer:'q1answer3 text', isCorrect:true},
	{position:0, categoryName:'catTest', qId:341, question:'question1 text', difficulty:'EASY', type:'MULTIPLE', aId:4341, answer:'q1answer4 text', isCorrect:false},
	{position:1, categoryName:'catTest', qId:241, question:'question2 text', difficulty:'MEDIUM', type:'BOOLEAN', aId:1241, answer:'q2answer1 text', isCorrect:false},
	{position:1, categoryName:'catTest', qId:241, question:'question2 text', difficulty:'MEDIUM', type:'BOOLEAN', aId:2241, answer:'q2answer2 text', isCorrect:true},
]

describe('QuestionsService', () => { //regroupe tous les tests du service
	let service: QuestionsService; //variable partagee par tous les tests du groupe
	const fakeValues = { $queryRaw: async()=> rows};
	beforeEach(async () => {//s'execute avant chaque it: chaque test repart d'un service neuf, sans etre incluence par le precedent
		const module: TestingModule = await Test.createTestingModule({//fabrique un petit module NestJS de test qui ne contient que ce qui est liste 
			providers: [
				QuestionsService, 
				{provide: PrismaService, useValue:{fakeValues}},//quand on demande PrismaService donne cet objet a la place (le faux Prisma)
			],
		}).compile();//NestJS assemble le module et fait les injections
		service = module.get<QuestionsService>(QuestionsService); //recupere le service avec le faux Prisma
	});
	
	it('should be defined', () => {//un test aui verifie que le service a pu etre cree
		expect(service).toBeDefined();
	});
});