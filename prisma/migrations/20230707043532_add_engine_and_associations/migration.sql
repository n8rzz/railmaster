-- CreateTable
CREATE TABLE "Engine" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fuelEfficiency" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
