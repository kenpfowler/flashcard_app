-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_card_id_fkey";

-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "deck" DROP CONSTRAINT "deck_subject_id_fkey";

-- AddForeignKey
ALTER TABLE "deck" ADD CONSTRAINT "deck_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
