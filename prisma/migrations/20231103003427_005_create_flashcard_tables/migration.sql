-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('MC', 'TF');

-- AlterTable
ALTER TABLE "subject" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "deck" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "question_type" "question_type" NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "answer_text" VARCHAR(255) NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correct_answer" (
    "card_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "correct_answer_card_id_key" ON "correct_answer"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "correct_answer_answer_id_key" ON "correct_answer"("answer_id");

-- CreateIndex
CREATE UNIQUE INDEX "correct_answer_card_id_answer_id_key" ON "correct_answer"("card_id", "answer_id");

-- AddForeignKey
ALTER TABLE "deck" ADD CONSTRAINT "deck_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correct_answer" ADD CONSTRAINT "correct_answer_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correct_answer" ADD CONSTRAINT "correct_answer_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
