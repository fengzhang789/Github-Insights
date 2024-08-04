/*
  Warnings:

  - You are about to drop the column `commitId` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Commit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "commitId";

-- AlterTable
ALTER TABLE "Commit" DROP COLUMN "authorId";
