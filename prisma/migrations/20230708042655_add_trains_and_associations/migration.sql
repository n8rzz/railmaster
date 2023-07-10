-- AlterTable
ALTER TABLE "Engine" ADD COLUMN     "trainId" INTEGER;

-- AlterTable
ALTER TABLE "Railcar" ADD COLUMN     "trainId" INTEGER;

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maxSpeed" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Railcar" ADD CONSTRAINT "Railcar_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
