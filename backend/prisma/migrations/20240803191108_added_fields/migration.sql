/*
  Warnings:

  - Added the required column `additions` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletions` to the `Commit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Commit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commit" ADD COLUMN     "additions" INTEGER NOT NULL,
ADD COLUMN     "deletions" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;
