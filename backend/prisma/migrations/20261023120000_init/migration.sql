-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL DEFAULT 'The Answer to the Ultimate Question of Life, the Universe, and Everything',

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
