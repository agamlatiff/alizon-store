/*
  Warnings:

  - Added the required column `description` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BrandStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "country" VARCHAR(100),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "BrandStatus" NOT NULL DEFAULT 'active',
ADD COLUMN     "website" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "description" SET DATA TYPE TEXT;
