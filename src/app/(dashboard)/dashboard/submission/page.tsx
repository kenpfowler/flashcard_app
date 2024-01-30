import SubmissionTable from "./SubmissionTable";
import { Resources, client } from "@/lib/dotnetApi";
import { Submission } from "@/types/entities";

const SubmissionPage = async () => {
  const res = await client.getResources<Submission[]>({
    resource: Resources.Submission,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Welcome to the SubmissionPage</h1>
      <SubmissionTable submissions={res.value} />
    </div>
  );
};

export default SubmissionPage;
