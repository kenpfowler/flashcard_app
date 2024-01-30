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

  const res = await client.getResources<Deck[]>({ resource: Resources.Deck });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  if (!card) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateCardsForm card={card} decks={res.value} />
    </div>
  );
};

export default UpdateCardsComponent;
