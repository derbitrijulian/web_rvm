-- CreateTable
CREATE TABLE "bottle_counts" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "distance" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bottle_counts_pkey" PRIMARY KEY ("id")
);
