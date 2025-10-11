/*
  Warnings:

  - You are about to drop the column `amount` on the `bottle_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `bottle_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `bottle_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `rvmLocationId` on the `bottle_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `bottle_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bottle_transactions` table. All the data in the column will be lost.
  - Added the required column `bottleCount` to the `bottle_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `bottle_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userBottleCountId` to the `bottle_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bottle_counts" ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'arduino';

-- AlterTable
ALTER TABLE "bottle_transactions" DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "rvmLocationId",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "bottleCount" INTEGER NOT NULL,
ADD COLUMN     "bottleCountId" INTEGER,
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "pointsEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionType" TEXT NOT NULL,
ADD COLUMN     "userBottleCountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bottle_transactions" ADD CONSTRAINT "bottle_transactions_userBottleCountId_fkey" FOREIGN KEY ("userBottleCountId") REFERENCES "user_bottle_counts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
