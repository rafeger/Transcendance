import { config } from "dotenv";
config({ path: "../.env" });
import { PrismaClient } from "../src/generated/prisma/client.js";
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
    return count == 0;
}

async function loadQuestionsFile(): Promise<QuestionsFile> {
  const text = await readFile(QUESTIONS_FILE, "utf8");
  return JSON.parse(text);
}

async function seedQuestions() {
    if (!(await isQuestionTableEmpty()))
    {
        console.log("Questions already seeded, skipping");
        return;
    }
    const file = await loadQuestionsFile();
    console.log(`File: ${file.categories.length} categories, ${file.questions.length} questions`);
}

async function seed()
{
    // await seedUsers()
    // .catch((e) => {
    //     console.error(e);
    //     process.exit(1);
    // })
    // .finally( async () => {
    //     await prisma.$disconnect();
    // });
    await seedQuestions();
}
