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

  const subjects = (await client.getResources({
    resource: Resources.Subject,
  })) as Subject[];

  if (!deck) {
    notFound();
  }

  if (!subjects) {
    throw Error("No subjects found");
  }

  return (
    <div className="flex justify-center">
      <UpdateDecksForm
        id={params.id}
        subjectId={deck.subjectId}
        subjects={subjects}
        name={deck.name}
        description={deck.description}
        imageUrl={deck.imageUrl}
      />
    </div>
  );
};

export default UpdateDecksComponent;
