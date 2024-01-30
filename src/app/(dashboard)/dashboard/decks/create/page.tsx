import { CreateDecksForm } from "./CreateDecksForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Subject } from "@/types/entities";

const CreateDecksPage = async ({ searchParams }: any) => {
  const { subject } = searchParams;
  const res = await client.getResources<Subject[]>({
    resource: Resources.Subject,
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center">
        <p>{res.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <CreateDecksForm subjects={res.value} subjectId={subject} />
    </div>
  );
};

export default CreateDecksPage;
