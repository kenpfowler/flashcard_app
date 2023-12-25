import prisma from "@/lib/prisma";
import { SessionForm } from "./SessionForm";
import { WithSearchParams } from "@/types/types";

export default async function SessionPage({ searchParams }: WithSearchParams) {
  const { deck } = searchParams;

  if (!deck) {
    return <h1>No flashcard session found!</h1>;
  }

  const items = await prisma.card.findMany({
    where: { deckId: deck },
    include: { answers: true },
  });

  const correctAnswers = items.map(
    (item) => item.answers.find((answer) => answer.isCorrect)?.id ?? ""
  );

  if (items.length === 0) {
    return <h3>There are no flashcards to display</h3>;
  }
  // The flashcards are being output individually, but I think I want to output the entire form at once.

  return (
    <div className="flex flex-col justify-center items-center">
      <SessionForm
        items={items}
        correctAnswers={correctAnswers}
        deckId={deck}
      />
    </div>
  );
}
