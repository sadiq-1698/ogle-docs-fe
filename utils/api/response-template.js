import { NextResponse } from "next/server";

const responseTemplate = (statusCode, responsePayload, headers) => {
  const defaultHeader = { "Content-Type": "application/json" };

  return new NextResponse(JSON.stringify(responsePayload), {
    status: statusCode,
    headers: { ...defaultHeader, headers },
  });
};

export default responseTemplate;
