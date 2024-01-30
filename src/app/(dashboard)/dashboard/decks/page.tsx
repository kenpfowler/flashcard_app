import DeckTable from "./DecksTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/entities";

const DecksPage = async () => {
  const res = await client.getResources<Deck[]>({ resource: Resources.Deck });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return <DeckTable decks={res.value} />;
};

export default DecksPage;
