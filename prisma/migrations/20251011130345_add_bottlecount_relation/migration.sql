/*
  Warnings:

  - You are about to drop the column `pointsEarned` on the `bottle_counts` table. All the data in the column will be lost.
  - You are about to drop the column `processed` on the `bottle_counts` table. All the data in the column will be lost.
  - You are about to drop the column `rvmLocationId` on the `bottle_counts` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `bottle_counts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bottle_counts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArduinoConnection" DROP CONSTRAINT "ArduinoConnection_locationId_fkey";

-- DropForeignKey
ALTER TABLE "bottle_counts" DROP CONSTRAINT "bottle_counts_rvmLocationId_fkey";

-- DropForeignKey
ALTER TABLE "bottle_counts" DROP CONSTRAINT "bottle_counts_userId_fkey";

-- DropForeignKey
ALTER TABLE "bottle_transactions" DROP CONSTRAINT "bottle_transactions_rvmLocationId_fkey";

-- DropForeignKey
ALTER TABLE "bottle_transactions" DROP CONSTRAINT "bottle_transactions_userId_fkey";

-- DropIndex
DROP INDEX "ArduinoConnection_deviceId_key";

-- AlterTable
ALTER TABLE "bottle_counts" DROP COLUMN "pointsEarned",
DROP COLUMN "processed",
DROP COLUMN "rvmLocationId",
DROP COLUMN "sessionId",
DROP COLUMN "userId",
ADD COLUMN     "userBottleCountId" TEXT;

-- AddForeignKey
ALTER TABLE "bottle_counts" ADD CONSTRAINT "bottle_counts_userBottleCountId_fkey" FOREIGN KEY ("userBottleCountId") REFERENCES "user_bottle_counts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
