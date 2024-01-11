"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Resources, client } from "@/lib/dotnetApi";
import { Card } from "@/types/prisma";

type CardTableProps = {
  cards: Card[];
};

const CardTable = ({ cards }: CardTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await client.deleteResource({
      resource: Resources.Card,
      body: id,
    });
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3>There are no cards to display</h3>
        <Button asChild>
          <Link href={"/cards/generate"}>Generate</Link>
        </Button>
        <Button asChild>
          <Link href={"/cards/create"}>Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={"/cards/create"}>Create</Link>
        </Button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Deck Id</th>
            <th className="text-left">name</th>
            <th className="text-left">Created</th>
            <th className="text-left">Updated</th>
            <th className="text-left">Image</th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.deckId}</td>
              <td>{card.name}</td>
              <td>{new Date(card.createdAt).toDateString()}</td>
              <td>{new Date(card.updatedAt).toDateString()}</td>
              <td>{card.imageUrl}</td>
              <td>
                <Link href={`/cards/${card.id}`}>Update</Link>
              </td>
              <td>
                <Button
                  onClick={async () => {
                    await handleDelete(card.id);
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

export default CardTable;
