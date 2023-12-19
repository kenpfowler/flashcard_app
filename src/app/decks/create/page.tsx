import prisma from "@/lib/prisma";
import { CreateDecksForm } from "./CreateDecksForm";

const CreateDecksPage = async ({ searchParams }: any) => {
  const { subject } = searchParams;
  const subjects = await prisma.subject.findMany();

  return (
    <div className="flex justify-center">
      <CreateDecksForm subjects={subjects} subjectId={subject} />
    </div>
  );
};

export default CreateDecksPage;
