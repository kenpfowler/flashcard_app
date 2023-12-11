export interface IOpenAiApi {
  parseQuestions: (question: string) => Promise<string[]>;
  parseCards: (
    questions: string[],
    subject: string
  ) => Promise<
    Array<{ question: string; answers: string[]; correctAnswerIndex: number }>
  >;
}
