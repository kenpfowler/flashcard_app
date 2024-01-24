import SubmissionTable from "./SubmissionTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Submission } from "@/types/entities";

const SubmissionPage = async () => {
  const submissions = (await client.getResources({
    resource: Resources.Submission,
  })) as Submission[];

  return (
    <div>
      <h1 className="text-center">Welcome to the SubmissionPage</h1>
      <SubmissionTable submissions={submissions} />
    </div>
  );
};

export default SubmissionPage;
