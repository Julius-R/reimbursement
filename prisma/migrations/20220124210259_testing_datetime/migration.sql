/*
  Warnings:

  - Made the column `updated` on table `reimbursements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reimbursements" ALTER COLUMN "updated" SET NOT NULL;
