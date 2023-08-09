-- AlterTable
ALTER TABLE "Engine" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
