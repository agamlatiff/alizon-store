/*
  Warnings:

  - The values [superadmin] on the enum `RoleUser` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleUser_new" AS ENUM ('seller', 'customer');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "RoleUser_new" USING ("role"::text::"RoleUser_new");
ALTER TYPE "RoleUser" RENAME TO "RoleUser_old";
ALTER TYPE "RoleUser_new" RENAME TO "RoleUser";
DROP TYPE "public"."RoleUser_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'customer';
