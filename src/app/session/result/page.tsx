import prisma from "@/lib/prisma";
import { WithSearchParams } from "@/types/types";
import clsx from "clsx";

export default async function SessionPage({ searchParams }: WithSearchParams) {
  if (!searchParams || !searchParams.submission) {
    return <h1>Your results could not be found!</h1>;
  }

  const results = await prisma.submission.findFirst({
    where: { id: searchParams.submission },
    include: {
      responses: { include: { card: { include: { answers: true } } } },
      deck: { select: { name: true } },
    },
  });

  // We want to show which answer the user selected.
  // Congratulate them if they were correct and show some success themed UI
  // Show them their answer and then highlight the correct answer if they were incorrect.

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Here are your results....</h1>
      <h2>{results?.deck.name}</h2>
      <div className="flex flex-col">
        {results?.responses.map((response) => (
          <div key={response.id}>
            {response.card.name}
            {response.card.answers.map((answer) =>
              response.answerId === response.correctAnswerId ? (
                <div
                  key={answer.id}
                  className={
                    response.answerId === answer.id ? "text-green-500" : ""
                  }
                >
                  {answer.answerText}
                </div>
              ) : (
                <div
                  key={answer.id}
                  className={clsx(
                    response.answerId === answer.id ? "text-red-500" : "",
                    answer.id === response.correctAnswerId
                      ? "text-green-500"
                      : ""
                  )}
                >
                  {answer.answerText}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
