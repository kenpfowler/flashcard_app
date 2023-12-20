import prisma from "@/lib/prisma";
import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateCardsForm } from "./UpdateCardsForm";

const UpdateCardsComponent = async ({ params }: WithParams) => {
  const card = await prisma.card.findUnique({
    where: { id: params.id },
  });

  const subjects = await prisma.subject.findMany();

  if (!card) {
    notFound();
  }

  if (!subjects) {
    throw Error("No subjects found");
  }

  return (
    <div className="flex justify-center">
      <UpdateCardsForm
        id={params.id}
        name={card.name}
        imageUrl={card.imageUrl ?? ""}
      />
    </div>
  );
};

export default UpdateCardsComponent;
