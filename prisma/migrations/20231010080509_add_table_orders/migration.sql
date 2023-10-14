-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('accepted', 'cooking', 'ready');

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "is_saled" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL,
    "status" "StatusType" NOT NULL,

    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
