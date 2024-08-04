/*
  Warnings:

  - A unique constraint covering the columns `[repoName]` on the table `Repo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Repo_repoName_key" ON "Repo"("repoName");
