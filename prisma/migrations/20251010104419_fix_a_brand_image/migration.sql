/*
  Warnings:

  - You are about to drop the column `logo` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `image` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "logo",
ADD COLUMN     "image" VARCHAR(255) NOT NULL;
