import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId, deckId, responses } = await req.json();

    const submission = await prisma.submission.create({
      data: { deckId, userId },
    });

    const responsesWithSubmissionId = responses.map((response: any) => ({
      ...response,
      submissionId: submission.id,
    }));

    const result = await prisma.response.createMany({
      data: responsesWithSubmissionId,
    });

    return NextResponse.json(submission.id);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
