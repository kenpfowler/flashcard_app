"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CardTableProps = {
  cards: Card[];
};

const CardTable = ({ cards }: CardTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/cards", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  };

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
            <th className="text-left">Question</th>
            <th className="text-left">Question Type</th>
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
              <td>{card.question}</td>
              <td>{card.questionType}</td>
              <td>{card.createdAt.toDateString()}</td>
              <td>{card.updatedAt.toDateString()}</td>
              <td>{card.imageUrl}</td>
              <td>
                <Link href={`/cards/${card.id}`}>Update</Link>
              </td>
              <td>
                <Button
                  onClick={async () => {
                    await handleDelete(card.id.toString());
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
