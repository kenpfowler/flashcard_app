import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateDecksForm } from "./UpdateDecksForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Deck, Subject } from "@/types/entities";

const UpdateDecksComponent = async ({ params }: WithParams) => {
  const deck = (await client.getResource({
    resource: Resources.Deck,
    options: { dynamicSegment: params.id },
  })) as Deck;

  const res = await client.getResources<Subject[]>({
    resource: Resources.Subject,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  if (!deck) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateDecksForm
        id={params.id}
        subjectId={deck.subjectId}
        subjects={res.value}
        name={deck.name}
        description={deck.description}
        imageUrl={deck.imageUrl}
      />
    </div>
  );
};

export default UpdateDecksComponent;
