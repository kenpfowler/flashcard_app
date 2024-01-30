import { GenerateCardsForm } from "./GenerateCardsForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/entities";

const CreateCardsPage = async () => {
  const res = await client.getResources<Deck[]>({
    resource: Resources.Deck,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <GenerateCardsForm decks={res.value} />
    </div>
  );
};

export default CreateCardsPage;
