import { Resources, client } from "@/lib/dotnetApi";
import { cn } from "@/lib/utils";
import { Submission } from "@/types/prisma";
import { WithSearchParams } from "@/types/types";

export default async function SessionPage({ searchParams }: WithSearchParams) {
  if (!searchParams || !searchParams.submission) {
    return <h1>Your results could not be found!</h1>;
  }

  const results = (await client.getResource({
    resource: Resources.Submission,
    options: {
      dynamicSegment: searchParams.submission,
      params: { responses: "true", deck: "true" },
    },
  })) as Submission;

  const correctAnswerCount = results.responses.map((response) =>
    response.answerId === response.correctAnswerId ? 1 : 0
  );

  const totalQuestions = results?.responses.length;

  const numCorrect = correctAnswerCount?.reduce(
    (prev: number, curr: number) => {
      return prev + curr;
    },
    0
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Here are your results....</h1>
      <h2>{results?.deck?.name}</h2>
      <div className="flex flex-col">
        {correctAnswerCount?.map((result, index) => (
          <div key={index} className="flex">
            <div>Q {index + 1}:</div>
            <div className="text-red-500">{result ? "✅" : "❌"}</div>
          </div>
        ))}
        <div className="flex">
          <div>
            {numCorrect} / {totalQuestions}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {results.responses.map((response) => (
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
                  className={cn(
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
