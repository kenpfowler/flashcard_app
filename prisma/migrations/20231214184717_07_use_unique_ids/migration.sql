/*
  Warnings:

  - The primary key for the `answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `deck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_card_id_fkey";

-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "deck" DROP CONSTRAINT "deck_subject_id_fkey";

-- AlterTable
ALTER TABLE "answer" DROP CONSTRAINT "answer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "card_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "answer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "answer_id_seq";

-- AlterTable
ALTER TABLE "card" DROP CONSTRAINT "card_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "deck_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "card_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "card_id_seq";

-- AlterTable
ALTER TABLE "deck" DROP CONSTRAINT "deck_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subject_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "deck_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "deck_id_seq";

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "subject_id_seq";

-- AddForeignKey
ALTER TABLE "deck" ADD CONSTRAINT "deck_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
