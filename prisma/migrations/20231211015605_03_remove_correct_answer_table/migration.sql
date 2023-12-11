/*
  Warnings:

  - You are about to drop the `correct_answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isCorrect` to the `answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "correct_answer" DROP CONSTRAINT "correct_answer_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "correct_answer" DROP CONSTRAINT "correct_answer_card_id_fkey";

-- AlterTable
ALTER TABLE "answer" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "correct_answer";
