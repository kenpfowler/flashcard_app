import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function Home() {
  const subjects = await prisma.subject.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.title}</li>
        ))}
      </ul>
      <Button>Click me</Button>
    </main>
  );
}
