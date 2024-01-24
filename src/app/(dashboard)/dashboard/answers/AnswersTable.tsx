"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Resources, client } from "@/lib/dotnetApi";
import { Answer } from "@/types/entities";

type AnswerTableProps = {
  answers: Answer[];
};

const AnswerTable = ({ answers }: AnswerTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await client.deleteResource({
      resource: Resources.Answer,
      body: id,
    });
  };

  if (answers.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3>There are no answers to display</h3>
        <Button asChild>
          <Link href={"/answers/create"}>Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={"/answers/create"}>Create</Link>
        </Button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Answer</th>
            <th className="text-left">isCorrect</th>
            <th className="text-left">Card Id</th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <tr key={answer.id}>
              <td>{answer.id}</td>
              <td>{answer.answerText}</td>
              <td>{answer.isCorrect === true ? "true" : "false"}</td>
              <td>{answer.cardId}</td>
              <td>
                <Link href={`/answers/${answer.id}`}>Update</Link>
              </td>
              <td>
                <Button
                  onClick={async () => {
                    await handleDelete(answer.id);
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

export default AnswerTable;
