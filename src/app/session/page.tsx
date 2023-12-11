import prisma from "@/lib/prisma";

import { FlashCard } from "./FlashCard";

export default async function SessionPage() {
  // to start a quiz the user needs to select it from the deck

  // subject
  //  deck
  // quiz <--- selecting the quiz from the hierarchy should trigger a fetch for all the data to run the quiz.

  // to run through a quiz with a user we need display each question and answer combination
  // the user needs to be able to select an answer and get feedback about the correctness
  // the users responses need to be recorded for analysis

  const items = await prisma.card.findMany({
    where: { deckId: 5 },
    include: { answers: true },
  });

  // each item has the answers for a specific question
  // when we output an item we want to output the answers as well
  // so, we get the items answer property and map over it

  if (items.length === 0) {
    return <h3>There are no flashcards to display</h3>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {items.map((item) => (
        <FlashCard key={item.id} item={item} />
      ))}
    </div>
  );
}
