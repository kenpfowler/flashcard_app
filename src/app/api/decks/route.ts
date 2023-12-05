import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    // FIXME: need to validate input for type and security
    const created = await prisma.deck.create({
      data: {
        subjectId: parseInt(data.subjectId),
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    // FIXME: need to validate input for type and security
    const updated = await prisma.deck.update({
      where: { id: parseInt(data.id) },
      data: {
        title: data.title,
        subjectId: parseInt(data.subjectId),
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    // FIXME: need to validate input for type and security

    const deleted = await prisma.deck.delete({
      where: { id: parseInt(data.id) },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
export async function HEAD(req: NextRequest, res: NextResponse) {}
export async function OPTIONS(req: NextRequest, res: NextResponse) {}
