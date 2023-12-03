import prisma from "@/lib/prisma";
import SubjectTable from "./SubjectTable";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany();

  return <SubjectTable subjects={subjects} />;
}
