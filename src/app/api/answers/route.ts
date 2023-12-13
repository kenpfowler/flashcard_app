import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { answerText, cardId, isCorrect } = data;

    const answer = await prisma.answer.create({
      data: {
        answerText: answerText,
        isCorrect: isCorrect,
        cardId: parseInt(cardId),
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { answerText, isCorrect, id } = data;

    const answer = await prisma.answer.update({
      data: {
        answerText,
        isCorrect,
      },
      where: { id: parseInt(id) },
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
    const data = await req.json();
    const { id } = data;
    const deleted = await prisma.answer.delete({ where: { id: parseInt(id) } });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function HEAD(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function OPTIONS(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
