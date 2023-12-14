export interface IOpenAiApi {
  parseQuestions: (question: string) => Promise<string[]>;
  parseCards: (
    questions: string[],
    subject: string
  ) => Promise<
    Array<{ name: string; answers: string[]; correctAnswerIndex: number }>
  >;
}
