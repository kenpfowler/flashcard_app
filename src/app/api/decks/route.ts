import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { subjectId, title, description, imageUrl } = await req.json();

    const created = await prisma.deck.create({
      data: {
        subjectId: parseInt(subjectId),
        title,
        description,
        imageUrl,
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
export async function PUT(req: NextRequest, res: NextResponse) {}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { title, subjectId, id, description, imageUrl } = await req.json();
    // FIXME: need to validate input for type and security
    const updated = await prisma.deck.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        imageUrl,
        subjectId: parseInt(subjectId),
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

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const deleted = await prisma.deck.delete({
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
export async function HEAD(req: NextRequest, res: NextResponse) {}
export async function OPTIONS(req: NextRequest, res: NextResponse) {}
