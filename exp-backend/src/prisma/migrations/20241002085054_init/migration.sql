/*
  Warnings:

  - Changed the type of `role` on the `LeadAccess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `OrganizationRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('ADMIN', 'SUPERADMIN', 'RESTRICTEDUSER', 'USER');

-- AlterTable
ALTER TABLE "LeadAccess" DROP COLUMN "role",
ADD COLUMN     "role" "AccessRole" NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationRole" DROP COLUMN "role",
ADD COLUMN     "role" "AccessRole" NOT NULL;

-- DropEnum
DROP TYPE "LeadAccessRole";
