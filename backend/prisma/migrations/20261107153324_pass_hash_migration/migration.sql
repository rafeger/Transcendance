/*
  Warnings:

  - Added the required column `passHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passHash" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PLAYER';
