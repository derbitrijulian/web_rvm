-- CreateTable
CREATE TABLE "ArduinoConnection" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "locationId" INTEGER,
    "ipAddress" TEXT,
    "status" TEXT NOT NULL,
    "lastPing" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArduinoConnection_pkey" PRIMARY KEY ("id")
);
