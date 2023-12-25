/*
  Warnings:

  - You are about to drop the column `user_id` on the `submission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_user_id_fkey";

-- AlterTable
ALTER TABLE "submission" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;
