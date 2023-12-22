import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log(data);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({ message: "failure", success: false })
    );
  }
}
