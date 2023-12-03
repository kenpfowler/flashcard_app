import prisma from "@/lib/prisma";
import { BaseDynamicRouteProps } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateSubjectForm } from "./UpdateSubjectForm";

const UpdateSubjectsComponent = async ({ params }: BaseDynamicRouteProps) => {
  const subject = await prisma.subject.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!subject) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <UpdateSubjectForm
        id={params.id}
        title={subject.title}
        description={subject.description}
        imageUrl={subject.imageUrl}
      />
    </div>
  );
};

export default UpdateSubjectsComponent;
