import {
  Subjects as GeneratedSubjects,
  Answers as GeneratedAnswers,
  Responses as GeneratedResponses,
  Cards as GeneratedCards,
  Decks as GeneratedDecks,
  Submissions as GeneratedSubmissions,
} from "@prisma/client";

type UncapitalizedKeys<T> = {
  [K in keyof T as Uncapitalize<`${K & string}`>]: T[K];
};

export type Subject = UncapitalizedKeys<GeneratedSubjects> & {
  decks: Array<Deck>;
};

export type Deck = UncapitalizedKeys<GeneratedDecks>;
export type Card = UncapitalizedKeys<GeneratedCards> & {
  deck: Deck | null;
  answers: Array<Answer>;
  responses: Array<Response>;
};
export type Answer = UncapitalizedKeys<GeneratedAnswers>;
export type Response = UncapitalizedKeys<GeneratedResponses>;
export type Submission = UncapitalizedKeys<GeneratedSubmissions>;
