/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Appointment";

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "inital_date" TIMESTAMP(3) NOT NULL,
    "final_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);
