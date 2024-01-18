import { SessionForm } from "./SessionForm";
import { WithSearchParams } from "@/types/types";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/prisma";

export default async function SessionPage({ searchParams }: WithSearchParams) {
  const { deckId } = searchParams;

  if (!deckId) {
    return <h1>No flashcard session found!</h1>;
  }

  const deck = (await client.getResource({
    resource: Resources.Deck,
    options: {
      dynamicSegment: deckId,
      params: { cards: "true", answers: "true" },
    },
  })) as Deck;

  if (deck?.cards.length === 0) {
    return <h3>There are no flashcards to display</h3>;
  }

  const correctAnswers = deck.cards.map(
    (card) => card.answers.find((answer) => answer.isCorrect)?.id ?? ""
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <SessionForm deck={deck} correctAnswers={correctAnswers ?? []} />
    </div>
  );
}
