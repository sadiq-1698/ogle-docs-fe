import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = new NextResponse(
      JSON.stringify({ message: "Logged out!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    response.cookies.delete("accessToken");

    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
