import prisma from "@/lib/prisma";
import { OpenAiService } from "@/services/IOpenAiApi";
import { NextRequest, NextResponse } from "next/server";
import { APIClient } from "openai/core.mjs";
const aiClient = new OpenAiService();

export async function GET(req: NextRequest, res: NextResponse) {}
export async function POST(req: NextRequest, res: NextResponse) {
  // receive a list of questions
  // create a card for each question
  // relate card to the correct deck
  // create answer(s) for each card
  // relate answer to the correct card
  // create a correct answer for each card
  // relate the correct answer to the card and answer

  try {
    const data = await req.json();
    const deckIdAsInt = parseInt(data.deckId);
    const deck = await prisma.deck.findFirst({
      where: { id: deckIdAsInt },
    });

    const questions = await aiClient.parseQuestions(data.questions);

    const cards = await prisma.$transaction(
      questions.map((question) =>
        prisma.card.create({
          data: { question: question, questionType: "MC", deckId: deckIdAsInt },
        })
      )
    );

    const subject = deck?.title ?? "";

    // FIXME: This operation should be able to generate answers for each question and
    const answers = await aiClient.createAnswers(data.questions, subject);

    // if (!Array.isArray(completion) || completion.length === 0) {
    //   throw new Error("Completion is not valid datatype");
    // }

    // model Answer {
    //   answerText    String         @map("answer_text") @db.VarChar(255)
    //   cardId        Int            @map("card_id")
    //   card          Card           @relation(fields: [cardId], references: [id])
    //   CorrectAnswer CorrectAnswer?

    //   @@map("answer")
    // }

    // let correctAnswerIndex = null;

    // const generatedAnswers = completion.map((item, index) => {
    //   if (item.isCorrect) {
    //     correctAnswerIndex = index;
    //   }

    //   return { answerText: item.answer as string, cardId: card.id };
    // });

    // const createdAnswers = await prisma.answer.createMany({
    //   data: generatedAnswers,
    // });

    // console.log({ createdAnswers, correctAnswerIndex });

    // model CorrectAnswer {
    //   cardId   Int    @unique @map("card_id")
    //   answerId Int    @unique @map("answer_id")
    //   answer   Answer @relation(fields: [answerId], references: [id])
    //   card     Card   @relation(fields: [cardId], references: [id])

    //   @@unique([cardId, answerId])
    //   @@map("correct_answer")
    // }

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {}
export async function PATCH(req: NextRequest, res: NextResponse) {}
export async function DELETE(req: NextRequest, res: NextResponse) {}
export async function HEAD(req: NextRequest, res: NextResponse) {}
export async function OPTIONS(req: NextRequest, res: NextResponse) {}
