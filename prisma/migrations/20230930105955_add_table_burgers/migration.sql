-- CreateTable
CREATE TABLE "burgers" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "burgers_pkey" PRIMARY KEY ("id")
);
