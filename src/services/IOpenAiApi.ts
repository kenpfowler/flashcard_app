import OpenAI from "openai";

type Tool = {
  type: "function";
  function: {
    description?: string;
    name: string;
    parameters: Properties;
  };
  required: Array<string>;
};

type Properties = {
  type: "object";
  properties: Object;
};

export class OpenAiService {
  private readonly client = new OpenAI();
  private readonly generate_mc_answer_tool: Tool = {
    type: "function",
    function: {
      name: "generate_answers",
      description:
        "Generate four possible answers to a given question.  Only one answer can be correct.",
      parameters: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "The question the user wants to generate multiple choice answers for. example: Who is the inventor of bitcoin?",
          },
        },
      },
    },
    required: ["question"],
  };

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
        model: "gpt-3.5-turbo",
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

  async createAnswers(
    question: string,
    subject: string
  ): Promise<{ answer: string; isCorrect: boolean }[]> {
    const systemPrompt = `You are a knowledgeable tutor of ${subject}. Create a list of four multiple choice style answers given a question. Only one answer can be correct and you will identify which one this is.  Store those answers in an array of JSON objects where each object is like this: { answer: string, isCorrect: boolean }`;
    const userPrompt = `Here is the question: ${question}`;

    // in this case we want to format our output in JSON that can be easily used to create answers in our database
    // then specify that the client must use this function when generating its output.

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo",
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
