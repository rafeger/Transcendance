import { config } from "dotenv";
config({ path: "../.env" });
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFile } from "node:fs/promises";
const QUESTIONS_FILE = new URL("./seed/questions.json", import.meta.url);
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
async function seedUsers() {
    const final = await prisma.user.createMany({
        data: [
            { userName: "Alice", passHash: "098elol", email: "alice@example.com" },
            { userName: "Bob", passHash: "lol3232", email: "bob@example.com" },
        ],
        skipDuplicates: true,
    });
    console.log(`inserted ${final.count} users`);
}
async function isQuestionTableEmpty() {
    const count = await prisma.question.count();
    return count === 0;
}
async function loadQuestionsFile() {
    const text = await readFile(QUESTIONS_FILE, "utf8");
    return JSON.parse(text);
}
async function seedCategories(categories) {
    const idMap = new Map();
    let i = 0;
    while (i < categories.length) {
        const c = categories[i];
        const row = await prisma.category.upsert({
            where: { opentdbId: c.opentdbId },
            update: { name: c.name },
            create: { opentdbId: c.opentdbId, name: c.name },
        });
        idMap.set(c.opentdbId, row.id);
        i++;
    }
    return idMap;
}
function toQuestionRow(q, categoryIds) {
    const categoryId = categoryIds.get(q.opentdbCategoryId);
    if (categoryId === undefined) {
        throw new Error(`Unknown category ${q.opentdbCategoryId} for question ${q.hash}`);
    }
    return {
        hash: q.hash,
        text: q.question,
        type: q.type,
        difficulty: q.difficulty,
        categoryId: categoryId,
    };
}
async function seedQuestionRows(questions, categoryIds) {
    const data = questions.map((q) => toQuestionRow(q, categoryIds));
    const rows = await prisma.question.createManyAndReturn({
        data: data,
        skipDuplicates: true,
        select: { id: true, hash: true },
    });
    const questionIds = new Map();
    let i = 0;
    while (i < rows.length) {
        questionIds.set(rows[i].hash, rows[i].id);
        i++;
    }
    return questionIds;
}
async function seedAnswer(questions, questionIds) {
    const data = [];
    let i = 0;
    while (i < questions.length) {
        const q = questions[i];
        const questionId = questionIds.get(questions[i].hash);
        if (questionId === undefined) {
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
    if (!(await isQuestionTableEmpty())) {
        console.log("Questions already seeded, skipping");
        return;
    }
    const file = await loadQuestionsFile();
    console.log(`File: ${file.categories.length} categories, ${file.questions.length} questions`);
    const categoryIds = await seedCategories(file.categories);
    console.log(`Categories: ${categoryIds.size}`);
}
async function seed() {
    await seedUsers();
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
//# sourceMappingURL=seed.js.map