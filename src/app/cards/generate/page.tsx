import prisma from "@/lib/prisma";
import { GenerateCardsForm } from "./GenerateCardsForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/prisma";

const CreateCardsPage = async () => {
  const decks = (await client.getResources({
    resource: Resources.Deck,
  })) as Deck[];

  return (
    <div className="flex justify-center">
      <GenerateCardsForm decks={decks} />
    </div>
  );
};

export default CreateCardsPage;
