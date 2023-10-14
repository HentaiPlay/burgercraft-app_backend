/*
  Warnings:

  - Added the required column `order_id` to the `burgers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "burgers" ADD COLUMN     "order_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "burgers" ADD CONSTRAINT "burgers_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
