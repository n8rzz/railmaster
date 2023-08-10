-- AlterTable
ALTER TABLE "Railcar" ADD COLUMN     "locationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Railcar" ADD CONSTRAINT "Railcar_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
