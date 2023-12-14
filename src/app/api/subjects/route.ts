import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const subjects = await prisma.subject.findMany();
  return NextResponse.json(subjects);
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, description, imageUrl } = await req.json();

    const created = await prisma.subject.create({
      data: {
        name,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, description, imageUrl } = await req.json();

    const updated = await prisma.subject.update({
      where: { id },
      data: {
        name,
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

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    const deleted = await prisma.subject.delete({
      where: { id },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
