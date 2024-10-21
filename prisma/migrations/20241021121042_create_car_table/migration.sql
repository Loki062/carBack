/*
  Warnings:

  - You are about to drop the column `room` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `car` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "room",
ADD COLUMN     "car" TEXT NOT NULL,
ADD COLUMN     "placa" TEXT NOT NULL;
