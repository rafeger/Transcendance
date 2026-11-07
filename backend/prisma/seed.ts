import { config } from "dotenv";
config({ path: "../.env" });
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
// import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({adapter});

async function seed() {

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

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally( async () => {
        await prisma.$disconnect();
    });