-- AlterTable
ALTER TABLE "Commit" ADD COLUMN     "entireCommitAnalysis" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "recommendedCommitMessage" TEXT NOT NULL DEFAULT '';
