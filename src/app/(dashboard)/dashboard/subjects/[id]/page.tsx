import { WithParams } from "@/types/types";
import { notFound } from "next/navigation";
import { UpdateSubjectForm } from "./UpdateSubjectForm";
import { Resources, client } from "@/lib/dotnetApi";
import { Subject } from "@/types/prisma";

export default async function UpdateSubjectsComponent({ params }: WithParams) {
  const subject = (await client.getResource({
    resource: Resources.Subject,
    options: { dynamicSegment: params.id },
  })) as Subject;

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
}
