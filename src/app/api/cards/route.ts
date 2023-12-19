import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      name,
      imageUrl,
      deckId,
      answer_1,
      isCorrect_1,
      answer_2,
      isCorrect_2,
      answer_3,
      isCorrect_3,
      answer_4,
      isCorrect_4,
    } = await req.json();

    const { id } = await prisma.card.create({
      data: { name, imageUrl, deckId, questionType: "MC" },
    });

    const answers = await prisma.answer.createMany({
      data: [
        { answerText: answer_1, isCorrect: isCorrect_1, cardId: id },
        { answerText: answer_2, isCorrect: isCorrect_2, cardId: id },
        { answerText: answer_3, isCorrect: isCorrect_3, cardId: id },
        { answerText: answer_4, isCorrect: isCorrect_4, cardId: id },
      ],
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { imageUrl, name, id } = await req.json();

    const updated = await prisma.card.update({
      data: { name, imageUrl },
      where: { id: id },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    const deleted = await prisma.card.delete({ where: { id } });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {}
export async function HEAD(req: NextRequest, res: NextResponse) {}
export async function OPTIONS(req: NextRequest, res: NextResponse) {}
