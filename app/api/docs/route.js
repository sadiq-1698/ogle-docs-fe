import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";

const tempAuthCheckMiddleware = async (request) => {
  const { cookies } = request;
  const { value: token } = cookies.get("accessToken") ?? { value: null };

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

  return { auth: true, response: hasVerifiedToken };
};

const reponseTemplate = (statusCode, responsePayload, headers) => {
  const defaultHeader = { "Content-Type": "application/json" };

  return new NextResponse(JSON.stringify(responsePayload), {
    status: statusCode,
    headers: { ...defaultHeader, headers },
  });
};

export async function POST(request) {
  try {
    const authCheck = await tempAuthCheckMiddleware(request);
    if (!authCheck.auth) return authCheck.response;

    const jsonBody = await request.json();
    const userId = authCheck.response.payload.id;
    const { name, content, isStarred, isTemplate } = jsonBody;

    const docObj = {
      name,
      userId,
      content,
      ...(isStarred && { isStarred: isStarred }),
      ...(isTemplate && { isTemplate: isTemplate }),
    };

    await connectToDatabase();
    const document = new documentModel(docObj);
    await document.save();

    return reponseTemplate(201, { message: "Document created successfully" });
  } catch (error) {
    return reponseTemplate(404, error);
  }
}

export async function GET(request) {
  try {
    const authCheck = await tempAuthCheckMiddleware(request);
    if (!authCheck.auth) return authCheck.response;

    const userId = authCheck.response.payload.id;

    await connectToDatabase();
    const documentsList = await documentModel.find({ userId: userId });

    if (!documentsList) {
      return reponseTemplate(404, { message: "Failed to fetch the documents" });
    }

    return reponseTemplate(200, {
      documentsList,
      message: "Document fetched successfully",
    });
  } catch (error) {
    return reponseTemplate(404, error);
  }
}
