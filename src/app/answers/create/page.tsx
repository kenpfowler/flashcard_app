import prisma from "@/lib/prisma";
import { CreateAnswersForm } from "./CreateAnswersForm";

const CreateAnswerPage = async () => {
  const cards = await prisma.card.findMany();

  return (
    <div className="flex justify-center">
      <CreateAnswersForm cards={cards} />
    </div>
  );
};

export default CreateAnswerPage;
