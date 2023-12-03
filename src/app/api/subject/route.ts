import api from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const subjects = await prisma.subject.findMany();
  return NextResponse.json(subjects);
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    // FIXME: need to validate input for type and security

    const created = await prisma.subject.create({
      data: {
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

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    // FIXME: need to validate input for type and security
    const updated = await prisma.subject.update({
      where: { id: parseInt(data.id) },
      data: {
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

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    // FIXME: need to validate input for type and security

    const deleted = await prisma.subject.delete({
      where: { id: parseInt(data.id) },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
