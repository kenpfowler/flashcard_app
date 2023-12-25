/*
  Warnings:

  - Added the required column `user_id` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "response_submission_id_key";

-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
