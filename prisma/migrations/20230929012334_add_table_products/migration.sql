-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('burger_ingredient', 'snack', 'sauce', 'drink');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "slug" TEXT NOT NULL,
    "photo_path" TEXT NOT NULL DEFAULT 'no_image.jpg',
    "price" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");
