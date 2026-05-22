/*
  Warnings:

  - The `recentSearchedCities` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "recentSearchedCities",
ADD COLUMN     "recentSearchedCities" TEXT[];

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "odometer" INTEGER NOT NULL,
    "bodyType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "transmission" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "features" TEXT[],
    "images" TEXT[],
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "dropOffDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT NOT NULL DEFAULT 'Pay at pickup',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_agency_fkey" FOREIGN KEY ("agency") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_car_fkey" FOREIGN KEY ("car") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_agency_fkey" FOREIGN KEY ("agency") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
