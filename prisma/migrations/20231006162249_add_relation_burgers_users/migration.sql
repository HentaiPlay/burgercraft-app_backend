/*
  Warnings:

  - Added the required column `crafter_id` to the `burgers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "burgers" ADD COLUMN     "crafter_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "burgers" ADD CONSTRAINT "burgers_crafter_id_fkey" FOREIGN KEY ("crafter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
