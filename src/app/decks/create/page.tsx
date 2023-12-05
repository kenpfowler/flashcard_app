import prisma from "@/lib/prisma";
import { CreateDecksForm } from "./CreateDecksForm";

const CreateDecksPage = async () => {
  const subjects = await prisma.subject.findMany();

  return (
    <div className="flex justify-center">
      <CreateDecksForm subjects={subjects} />
    </div>
  );
};

export default CreateDecksPage;
