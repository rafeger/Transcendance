import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export type QuestionRow = {
  position: number;
  categoryName: string;
  qId: number;
  question: string;
  difficulty: string;
  type: string;
  aId: number;
  answer: string;
  isCorrect: boolean;
};
export type GameQuestion = {
  position: number;
  categoryName: string;
  qId: number;
  question: string;
  difficulty: string;
  type: string;
  choices: Choice[];
  correctChoiceId: string | null;
};
export type Choice = {
  id: string;
  text: string;
};

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  async drawQuestion(gameId: number, count: number) {
    await this.prisma.$transaction(async (tx) => {
      const n =
        await tx.$executeRaw`INSERT INTO "GameQuestion" ("gameId", "questionId", "position") SELECT "Game"."id", "Question"."id", 
        ROW_NUMBER()OVER(ORDER BY random()) - 1 AS position 
        FROM "Question" INNER JOIN "Game" USING ("difficulty", "categoryId") 
        WHERE "Game"."id" = ${gameId} 
        ORDER BY position 
        LIMIT ${count};`;
      if (n === 0) {
        throw new Error('Game not found');
      }
      if (n < count) {
        throw new Error(
          'Not enough questions available for the specified game.',
        );
      }
    });
  }

  async load(gameId: number) {
    const questionRows = await this.prisma.$queryRaw<
      QuestionRow[]
    >` SELECT "GameQuestion"."position" AS position, "Category"."name" AS "categoryName", "Question"."id" AS "qId", "Question"."text" AS question, "Question"."difficulty", 
    "Question"."type", "Answer"."id" AS "aId", "Answer"."text" AS answer, "Answer"."isCorrect" FROM "GameQuestion" 
    INNER JOIN "Question" ON "GameQuestion"."questionId" = "Question"."id" 
    INNER JOIN "Category" ON "Question"."categoryId" = "Category"."id" 
    INNER JOIN "Answer" ON "Answer"."questionId" = "Question"."id" 
    WHERE "gameId" = ${gameId} 
    ORDER BY position, md5("GameQuestion"."gameId"::text || '-' || "Answer"."id"::text);`;
    const gameQuestions: GameQuestion[] = [];
    const letters = ['a', 'b', 'c', 'd'];
    for (const questionRow of questionRows) {
      let gameQuestion = gameQuestions.find((i) => i.qId === questionRow.qId);
      if (!gameQuestion) {
        gameQuestion = {
          position: questionRow.position,
          categoryName: questionRow.categoryName,
          qId: questionRow.qId,
          question: questionRow.question,
          difficulty: questionRow.difficulty,
          type: questionRow.type,
          choices: [],
          correctChoiceId: null,
        };
        gameQuestions.push(gameQuestion);
      }
      const letter = letters[gameQuestion.choices.length];
      gameQuestion.choices.push({
        id: letter,
        text: questionRow.answer,
      });
      if (questionRow.isCorrect) {
        gameQuestion.correctChoiceId = letter;
      }
    }
    return gameQuestions;
  }
  async pickQuestion(gameId: number, count: number) {
    await this.drawQuestion(gameId, count);
    return await this.load(gameId);
  }
}
