import prisma from "@/lib/prisma";
import { BaseDynamicRouteProps } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateCardsForm } from "./UpdateCardsForm";

const UpdateCardsComponent = async ({ params }: BaseDynamicRouteProps) => {
  const card = await prisma.card.findUnique({
    where: { id: parseInt(params.id) },
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
        question={card.question}
        imageUrl={card.imageUrl ?? ""}
      />
    </div>
  );
};

export default UpdateCardsComponent;
