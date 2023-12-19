import prisma from "@/lib/prisma";
import { GenerateCardsForm } from "./GenerateCardsForm";

const CreateCardsPage = async () => {
  const decks = await prisma.deck.findMany({
    select: { id: true, name: true },
  });

  return (
    <div className="flex justify-center">
      <GenerateCardsForm decks={decks} />
    </div>
  );
};

export default CreateCardsPage;
