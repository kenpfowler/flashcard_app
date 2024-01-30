import {
  Subjects as GeneratedSubjects,
  Answers as GeneratedAnswers,
  Responses as GeneratedResponses,
  Cards as GeneratedCards,
  Decks as GeneratedDecks,
  Submissions as GeneratedSubmissions,
  AspNetUsers as GeneratedUsers,
} from "./dbschema";

type UncapitalizedKeys<T> = {
  [K in keyof T as Uncapitalize<`${K & string}`>]: T[K];
};

export type Subject = UncapitalizedKeys<GeneratedSubjects> & {
  decks: Array<Deck>;
};

export type Deck = UncapitalizedKeys<GeneratedDecks> & {
  cards: Array<Card>;
  subject: Subject;
  submissions: Array<Submission>;
};

export type Card = UncapitalizedKeys<GeneratedCards> & {
  deck: Deck | null;
  answers: Array<Answer>;
  responses: Array<Response>;
};

export type Answer = UncapitalizedKeys<GeneratedAnswers>;
export type Response = UncapitalizedKeys<GeneratedResponses> & {
  card: Card;
  submission: Submission;
};

export type Submission = UncapitalizedKeys<GeneratedSubmissions> & {
  deck: Deck | null;
  responses: Array<Response>;
};

export type Result = UncapitalizedKeys<GeneratedSubmissions>;

export type User = UncapitalizedKeys<
  Pick<GeneratedUsers, "Email" | "EmailConfirmed" | "FirstName" | "LastName">
>;

export type Tree = Subject;
