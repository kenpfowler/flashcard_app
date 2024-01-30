import AnswersTable from "./AnswersTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Answer } from "@/types/entities";

const AnswersPage = async () => {
  const res = await client.getResources<Answer[]>({
    resource: Resources.Answer,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return <AnswersTable answers={res.value} />;
};

export default AnswersPage;
