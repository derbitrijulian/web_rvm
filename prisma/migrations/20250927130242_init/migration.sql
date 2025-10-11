-- CreateEnum
CREATE TYPE "BottleTransactionType" AS ENUM ('DEPOSIT', 'REDEEM', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bottle_counts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalBottles" INTEGER NOT NULL DEFAULT 0,
    "redeemableCount" INTEGER NOT NULL DEFAULT 0,
    "lifetimeCount" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_bottle_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bottle_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rvmLocationId" INTEGER,
    "type" "BottleTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bottle_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RvmLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "capacity" INTEGER NOT NULL,
    "capacityStatus" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RvmLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_bottle_counts_userId_key" ON "user_bottle_counts"("userId");

-- AddForeignKey
ALTER TABLE "user_bottle_counts" ADD CONSTRAINT "user_bottle_counts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
