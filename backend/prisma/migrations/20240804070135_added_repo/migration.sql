-- AlterTable
ALTER TABLE "Commit" ADD COLUMN     "repoId" TEXT;

-- CreateTable
CREATE TABLE "Repo" (
    "id" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
