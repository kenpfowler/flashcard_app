import prisma from "@/lib/prisma";
import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateSubjectForm } from "./UpdateSubjectForm";

const UpdateSubjectsComponent = async ({ params }: WithParams) => {
  const subject = await prisma.subject.findUnique({
    where: { id: params.id },
  });

  if (!subject) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateSubjectForm
        id={params.id}
        name={subject.name}
        description={subject.description}
        imageUrl={subject.imageUrl}
      />
    </div>
  );
};

export default UpdateSubjectsComponent;
