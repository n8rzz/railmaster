-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
