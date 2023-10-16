/*
  Warnings:

  - Added the required column `crafter_id` to the `stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stats" ADD COLUMN     "crafter_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_crafter_id_fkey" FOREIGN KEY ("crafter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "stats_crafter_id_key" ON "stats"("crafter_id");
