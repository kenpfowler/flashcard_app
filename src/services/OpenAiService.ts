export interface IOpenAiApi {
  createAnswers: (question: string) => Promise<unknown>;
}
