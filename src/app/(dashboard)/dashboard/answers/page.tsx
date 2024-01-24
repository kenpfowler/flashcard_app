import AnswersTable from "./AnswersTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Answer } from "@/types/entities";

const AnswersPage = async () => {
  const res = (await client.getResources({
    resource: Resources.Answer,
  })) as Answer[];

  return <AnswersTable answers={res} />;
};

export default AnswersPage;
