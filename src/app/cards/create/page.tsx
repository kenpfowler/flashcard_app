import prisma from "@/lib/prisma";
import { CreateCardsForm } from "./CreateCardsForm";

const CreateCardsPage = async () => {
  const decks = await prisma.deck.findMany();

  return (
    <div className="flex justify-center">
      <CreateCardsForm decks={decks} />
    </div>
  );
};

export default CreateCardsPage;
