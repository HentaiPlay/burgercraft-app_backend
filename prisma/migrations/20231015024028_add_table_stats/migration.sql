-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "summ" INTEGER NOT NULL,
    "amount_orders" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);
