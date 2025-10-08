/*
  Warnings:

  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusCategory" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "status" "StatusCategory" NOT NULL DEFAULT 'active';
