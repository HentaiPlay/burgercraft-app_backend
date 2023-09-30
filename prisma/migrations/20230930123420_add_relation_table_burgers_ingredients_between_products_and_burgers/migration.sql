-- CreateTable
CREATE TABLE "burgers_ingredients" (
    "id" SERIAL NOT NULL,
    "burger_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "burgers_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "burgers_ingredients_burger_id_key" ON "burgers_ingredients"("burger_id");

-- CreateIndex
CREATE UNIQUE INDEX "burgers_ingredients_ingredient_id_key" ON "burgers_ingredients"("ingredient_id");

-- AddForeignKey
ALTER TABLE "burgers_ingredients" ADD CONSTRAINT "burgers_ingredients_burger_id_fkey" FOREIGN KEY ("burger_id") REFERENCES "burgers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "burgers_ingredients" ADD CONSTRAINT "burgers_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
