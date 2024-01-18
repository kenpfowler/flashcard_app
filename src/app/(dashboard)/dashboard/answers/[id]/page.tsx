import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateAnswersForm } from "./UpdateAnswersForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Answer } from "@/types/prisma";

const UpdateCardsComponent = async ({ params }: WithParams) => {
  const answer = (await client.getResource({
    resource: Resources.Answer,
    options: { dynamicSegment: params.id },
  })) as Answer;

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
