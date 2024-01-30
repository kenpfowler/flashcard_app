import { CreateAnswersForm } from "./CreateAnswersForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Card } from "@/types/entities";

const CreateAnswerPage = async () => {
  const result = await client.getResources<Card[]>({
    resource: Resources.Card,
  });

  if (!result.ok) {
    return (
      <div className="flex justify-center">
        <p>{result.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <CreateAnswersForm cards={result.value} />
    </div>
  );
};

export default CreateAnswerPage;
