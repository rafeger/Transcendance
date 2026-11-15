import { config } from "dotenv";
config({ path: "../.env" });
import { PrismaClient, QuestionType, Difficulty } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFile } from "node:fs/promises";

const QUESTIONS_FILE = new URL ("./seed/questions.json", import.meta.url);
// import * as bcrypt from "bcrypt";

type QuestionEntry = {
    hash: string;
    opentdbCategoryId: number;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

type CategoryEntry = {
    opentdbId: number; 
    name: string;
};

type QuestionsFile = {
    source: string;
    license: string;
    categories: CategoryEntry[];
    questions: QuestionEntry[]; 
} 

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({adapter});

async function seedUsers() {

    // const aliceHash = await bcrypt.hash("alice123", 10);
    // const bobHash = await bcrypt.hash("bob123", 10);
    // passHash: aliceHash
    const final = await prisma.user.createMany({
        data: [
            { userName: "Alice", passHash: "098elol", email: "alice@example.com" },
            { userName: "Bob", passHash: "lol3232", email: "bob@example.com" },
        ],
        skipDuplicates: true,
    });
    console.log(`inserted ${final.count} users`);
}

async function isQuestionTableEmpty(): Promise<boolean>{
    const count = await prisma.question.count();
    return count === 0;
}

async function loadQuestionsFile(): Promise<QuestionsFile> {
  const text = await readFile(QUESTIONS_FILE, "utf8");
  return JSON.parse(text);
}


async function seedCategories(categories: CategoryEntry[]): Promise<Map<number, number>>
{
    // want to keep a map of the tdb and db ids
    const idMap = new Map<number, number>();
    let i = 0;
    while (i < categories.length)
    {
        const c = categories[i];
        const row = await prisma.category.upsert({
            where: { opentdbId: c.opentdbId },
            update: { name : c.name },
            create: { opentdbId: c.opentdbId, name: c.name },
        });
        idMap.set(c.opentdbId, row.id);
        i++;
    }
    return idMap;
}

// take an entry questions.json --> out for row into Question table

function toQuestionRow(q: QuestionEntry, categoryIds: Map<number, number>)
{
    const categoryId = categoryIds.get(q.opentdbCategoryId);
    if (categoryId === undefined)
    {
        throw new Error(`Unknown category ${q.opentdbCategoryId} for question ${q.hash}`);
    }
    return{
        hash: q.hash,
        text: q.question,
        type: q.type as QuestionType,
        difficulty: q.difficulty as Difficulty,
        categoryId: categoryId,
    }
}

// turn every JSON question into row and inserts them all in one query
async function seedQuestionRows( questions: QuestionEntry[], 
    categoryIds: Map<number, number>,): Promise<Map<string, number>> {
    const data = questions.map((q) => toQuestionRow(q, categoryIds));
    const rows = await prisma.question.createManyAndReturn({
        data: data,
        skipDuplicates: true,
        select: { id: true, hash: true }, // need id and hash back 
    });
    const questionIds = new Map<string, number>();
    let i = 0;
    while (i < rows.length)
    {
        questionIds.set(rows[i].hash, rows[i].id);
        i++;
    }
    return questionIds;
}

type AnswerRow = {
    text: string;
    isCorrect: boolean;
    questionId: number;
};

async function seedAnswer(questions: QuestionEntry[], 
    questionIds: Map<string, number>,
): Promise<number>
{
    const data: AnswerRow[] = [];
    let i = 0;
    while (i < questions.length)
    {
        const q = questions[i];
        const questionId = questionIds.get(questions[i].id);
        if (questionId === undefined)
        {
            throw new Error(`No question row for hash ${q.hash}`);
        }
        data.push({ text: q.correctAnswer, isCorrect: true, questionId: questionId });
        let j = 0;
        while (j < q.incorrectAnswers.length) {
        data.push({ text: q.incorrectAnswers[j], isCorrect: false, questionId: questionId });
        j++;
        }
        i++;
    }
    const result = await prisma.answer.createMany({ data: data });
    return result.count;
}

async function seedRest() {
    if (!(await isQuestionTableEmpty()))
    {
        console.log("Questions already seeded, skipping");
        return;
    }
    const file = await loadQuestionsFile();
    console.log(`File: ${file.categories.length} categories, ${file.questions.length} questions`);
    const categoryIds = await seedCategories(file.categories);
    console.log(`Categories: ${categoryIds.size}`);
    // const questionIds = await seedQuestionRows(file.questions, categoryIds);
    // console.log(`Questions: ${questionIds.size}`);
    // const answerCount = await seedAnswers(file.questions, questionIds);
    // console.log(`Answers: ${answerCount}`);
}

async function seed()
{
    await seedUsers()
    await seedRest();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });