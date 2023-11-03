import prisma from "@/lib/prisma";

export default async function Home() {
  const subjects = await prisma.subject.findMany({
    include: { decks: { include: { cards: { include: { answers: true } } } } },
  });

  const hasSubjects = subjects.length > 0;

  // TODO:
  // each subject should be an clickable accordion that reveals associated decks

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center">Hello, World!</h1>
        {hasSubjects ? (
          subjects.map((subject) => <h2 key={subject.id}>{subject.title}</h2>)
        ) : (
          <h2>You haven&apos;t created any subjects yet</h2>
        )}
      </div>
    </main>
  );
}
