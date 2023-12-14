import prisma from "@/lib/prisma";
import { BaseDynamicRouteProps } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateDecksForm } from "./UpdateDecksForm";

const UpdateDecksComponent = async ({ params }: BaseDynamicRouteProps) => {
  const deck = await prisma.deck.findUnique({
    where: { id: params.id },
  });

  const subjects = await prisma.subject.findMany();

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
        subjectId={deck.subjectId.toString()}
        subjects={subjects}
        name={deck.name}
        description={deck.description}
        imageUrl={deck.imageUrl}
      />
    </div>
  );
};

export default UpdateDecksComponent;
