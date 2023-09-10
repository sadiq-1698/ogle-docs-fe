import { NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("accessToken") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/auth/login?${searchParams}`, url)
    );
    response.cookies.delete("accessToken");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/docs/:path*"],
};
