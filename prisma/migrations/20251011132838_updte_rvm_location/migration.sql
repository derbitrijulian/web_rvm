/*
  Warnings:

  - You are about to drop the `RvmLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RvmLocation";

-- CreateTable
CREATE TABLE "rvm_locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "position" JSONB NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 100,
    "currentStock" INTEGER NOT NULL DEFAULT 0,
    "capacityStatus" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "operationalHours" TEXT NOT NULL DEFAULT '08:00-22:00',
    "contactNumber" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rvm_locations_pkey" PRIMARY KEY ("id")
);
