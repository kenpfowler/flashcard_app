/*
  Warnings:

  - You are about to drop the column `question` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `deck` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "subject_title_key";

-- AlterTable
ALTER TABLE "card" DROP COLUMN "question",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deck" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "subject" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subject_name_key" ON "subject"("name");
