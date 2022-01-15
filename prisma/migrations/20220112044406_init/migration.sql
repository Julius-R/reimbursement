-- DropForeignKey
ALTER TABLE "reimbursements" DROP CONSTRAINT "reimbursements_reviewerId_fkey";

-- AlterTable
ALTER TABLE "reimbursements" ALTER COLUMN "reviewerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reimbursements" ADD CONSTRAINT "reimbursements_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
