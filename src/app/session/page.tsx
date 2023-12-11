import prisma from "@/lib/prisma";
import { FlashCard } from "./FlashCard";

export default async function SessionPage({ searchParams }: any) {
  const { deck } = searchParams;

  if (!deck) {
    return <h1>No flashcard session found!</h1>;
  }

  const items = await prisma.card.findMany({
    where: { deckId: parseInt(deck) },
    include: { answers: true },
  });

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
