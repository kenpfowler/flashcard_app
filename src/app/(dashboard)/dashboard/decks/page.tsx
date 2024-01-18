import prisma from "@/lib/prisma";
import DeckTable from "./DecksTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck } from "@/types/prisma";

const DecksPage = async () => {
  const res = await client.getResources({ resource: Resources.Deck });

  return <DeckTable decks={res as Deck[]} />;
};

export default DecksPage;
