import prisma from "@/lib/prisma";
import DeckTable from "./DecksTable";

const DecksPage = async () => {
  const decks = await prisma.deck.findMany();

  return <DeckTable decks={decks} />;
};

export default DecksPage;
