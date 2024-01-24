import { CreateAnswersForm } from "./CreateAnswersForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Card } from "@/types/entities";

const CreateAnswerPage = async () => {
  const cards = (await client.getResources({
    resource: Resources.Card,
  })) as Card[];

  return (
    <div className="flex justify-center">
      <CreateAnswersForm cards={cards} />
    </div>
  );
};

export default CreateAnswerPage;
