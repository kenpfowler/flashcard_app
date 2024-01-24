import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { Resources, client } from "@/lib/dotnetApi";
import { Card, Deck } from "@/types/entities";
import { UpdateCardsForm } from "./UpdateCardsForm";

const UpdateCardsComponent = async ({ params }: WithParams) => {
  const card = (await client.getResource({
    resource: Resources.Card,
    options: { dynamicSegment: params.id, params: { answers: "true" } },
  })) as Card;

  const decks = (await client.getResources({ resource: "deck" })) as Deck[];

  if (!card) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateCardsForm card={card} decks={decks} />
    </div>
  );
};

export default UpdateCardsComponent;
