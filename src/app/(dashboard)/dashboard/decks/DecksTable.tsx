"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Deck } from "@/types/prisma";
import { Resources, client } from "@/lib/dotnetApi";

type DeckTableProps = {
  decks: Deck[];
};

const DeckTable = ({ decks }: DeckTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await client.deleteResource({
      resource: Resources.Deck,
      body: id,
    });
  };

  if (decks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3>There are no decks to display</h3>
        <Button asChild>
          <Link href={"/decks/create"}>Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={"/decks/create"}>Create</Link>
        </Button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">name</th>
            <th className="text-left">Description</th>
            <th className="text-left">Created</th>
            <th className="text-left">Updated</th>
            <th className="text-left">Image</th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id}>
              <td>{deck.id}</td>
              <td>{deck.name}</td>
              <td>{deck.description}</td>
              <td>{new Date(deck.createdAt).toDateString()}</td>
              <td>{new Date(deck.updatedAt).toDateString()}</td>
              <td>{deck.imageUrl}</td>
              <td>
                <Link href={`/decks/${deck.id}`}>Update</Link>
              </td>
              <td>
                <Button
                  onClick={async () => {
                    await handleDelete(deck.id);
                    router.refresh();
                  }}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DeckTable;
