import prisma from "@/lib/prisma";
import { BaseDynamicRouteProps } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateAnswersForm } from "./UpdateAnswersForm";

const UpdateCardsComponent = async ({ params }: BaseDynamicRouteProps) => {
  const answer = await prisma.answer.findUnique({
    where: { id: params.id },
  });

  if (!answer) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateAnswersForm
        id={params.id}
        answerText={answer.answerText}
        isCorrect={answer.isCorrect}
      />
    </div>
  );
};

export default UpdateCardsComponent;
