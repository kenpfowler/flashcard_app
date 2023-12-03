import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center w-full">
        <Link href={"/subjects"}>Subjects</Link>
        <Link href={"/decks"}>Decks</Link>
        <Link href={"/cards"}>Cards</Link>
      </div>
    </main>
  );
}
