import OpenAI from "openai";
import { IOpenAiApi } from "./OpenAiService";

export class OpenAiService implements IOpenAiApi {
  private readonly client = new OpenAI();

  constructor() {
    this.client.apiKey = process.env.OPENAI_API_KEY ?? "";
  }

  async parseQuestions(questions: string): Promise<string[]> {
    const systemPrompt = `Can you please take the list of questions provided and organize them into an array of strings?  The array must be valid JSON.  Only return the array with no other explanation or commentary.  Also, do not use markdown or any other markup decorate the your response. Finally, remove any notation that identifies the question as part of a list - just include the text that represents the question.`;
    const userPrompt = `Here is the list of questions: ${questions}`;

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo-1106",
      });

      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error("Failed to generate content");
      }

      const parsed = JSON.parse(content);

      if (!Array.isArray(parsed)) {
        throw new Error("Generated content is not of type Array");
      }

      return parsed;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async parseCards(
    questions: string[],
    subject: string
  ): Promise<
    { question: string; answers: string[]; correctAnswerIndex: number }[]
  > {
    const systemPrompt = `You are a knowledgeable tutor of ${subject}. Create a list of four multiple choice style answers given a question. Only one answer can be correct and you will identify which one this is.  Store the questions with their answers in an array of JSON objects where each object is like this: { question: string, answers: string[], correctAnswerIndex: number }. The array must be valid JSON.  Only return the array with no other explanation or commentary.  Also, do not use markdown or any other markup decorate the your response.`;
    const userPrompt = `Here is the questions: ${questions.join(", ")}`;

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo-1106",
      });

      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error("Failed to generate content");
      }

      const parsed = JSON.parse(content);

      if (!Array.isArray(parsed)) {
        throw new Error("Generated content is not of type Array");
      }

      return parsed;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
