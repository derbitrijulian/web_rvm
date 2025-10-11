/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `ArduinoConnection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bottle_counts" ADD COLUMN     "pointsEarned" INTEGER,
ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rvmLocationId" INTEGER,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ArduinoConnection_deviceId_key" ON "ArduinoConnection"("deviceId");

-- AddForeignKey
ALTER TABLE "bottle_transactions" ADD CONSTRAINT "bottle_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bottle_transactions" ADD CONSTRAINT "bottle_transactions_rvmLocationId_fkey" FOREIGN KEY ("rvmLocationId") REFERENCES "RvmLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArduinoConnection" ADD CONSTRAINT "ArduinoConnection_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "RvmLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bottle_counts" ADD CONSTRAINT "bottle_counts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bottle_counts" ADD CONSTRAINT "bottle_counts_rvmLocationId_fkey" FOREIGN KEY ("rvmLocationId") REFERENCES "RvmLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
