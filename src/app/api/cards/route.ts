import prisma from "@/lib/prisma";
import { OpenAiService } from "@/services/IOpenAiApi";
import { NextRequest, NextResponse } from "next/server";
const aiClient = new OpenAiService();

export async function GET(req: NextRequest, res: NextResponse) {}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const deckIdAsInt = parseInt(data.deckId);
    const deck = await prisma.deck.findFirst({
      where: { id: deckIdAsInt },
    });

    const subject = deck?.title ?? "";
    const questions = await aiClient.parseQuestions(data.questions);
    const cardData = await aiClient.parseCards(questions, subject);
    const answersMatrix = await cardData.map((data) => data.answers);

    const cards = await prisma.$transaction(
      cardData.map((data) =>
        prisma.card.create({
          data: {
            question: data.question,
            questionType: "MC",
            deckId: deckIdAsInt,
          },
        })
      )
    );

    const answers = await prisma.$transaction(
      answersMatrix
        .map((row, index) => {
          let outerIndex = index;
          return row.map((answer, index) =>
            prisma.answer.create({
              data: {
                answerText: answer,
                cardId: cards[outerIndex].id,
                isCorrect: cardData[outerIndex].correctAnswerIndex === index,
              },
            })
          );
        })
        .flat()
    );

    console.log(answers);

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
