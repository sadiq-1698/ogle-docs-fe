import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";

const authCheck = async (request) => {
  const { cookies } = request;
  const { value: token } = cookies.get("accessToken") ?? { value: null };
  const { value: userName } = cookies.get("userName") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  if (!hasVerifiedToken) {
    const response = new NextResponse(
      JSON.stringify({ message: "Unauthorized to fetch these documents" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
    return { auth: false, response };
  }

  return { auth: true, response: { ...hasVerifiedToken, userName } };
};

export default authCheck;
