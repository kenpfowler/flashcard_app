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
          return NextResponse.json(res);
        } catch (error) {
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
          return NextResponse.json(res);
        } catch (error) {
          return NextResponse.json(
            JSON.stringify({ message: "failure", success: false })
          );
        }      
      }
      export async function DELETE(req: NextRequest, res: NextResponse) {
        try {
          return NextResponse.json(res);
        } catch (error) {
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
      