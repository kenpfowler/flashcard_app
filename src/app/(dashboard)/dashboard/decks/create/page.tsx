import prisma from "@/lib/prisma";
import { CreateDecksForm } from "./CreateDecksForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Subject } from "@/types/prisma";

const CreateDecksPage = async ({ searchParams }: any) => {
  const { subject } = searchParams;
  const res = (await client.getResources({
    resource: Resources.Subject,
  })) as Subject[];

  return (
    <div className="flex justify-center">
      <CreateDecksForm subjects={res} subjectId={subject} />
    </div>
  );
};

export default CreateDecksPage;
