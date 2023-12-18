import Link from "next/link";
import { SelectSessionForm } from "./SelectSessionForm";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const subjects = await prisma.subject.findMany({
    include: { children: true },
  });

  if (subjects.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center space-y-2 justify-center ">
          <h3>You haven't created and subjects to study.</h3>
          <Button asChild>
            <Link href={"/subjects/create"}>Create</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full">
        <SelectSessionForm subjectsWithDecks={subjects} />
      </div>
    </main>
  );
}
