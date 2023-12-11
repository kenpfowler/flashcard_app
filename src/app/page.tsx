import Link from "next/link";
import { SelectSessionForm } from "./SelectSessionForm";
import prisma from "@/lib/prisma";

export default async function Home() {
  const subjects = await prisma.subject.findMany({ include: { decks: true } });

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full">
        <SelectSessionForm subjectsWithDecks={subjects} />
      </div>
    </main>
  );
}
