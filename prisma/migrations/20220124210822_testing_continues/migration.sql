/*
  Warnings:

  - You are about to drop the column `created` on the `reimbursements` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `reimbursements` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `reimbursements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reimbursements" DROP COLUMN "created",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
