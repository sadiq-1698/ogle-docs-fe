import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

export async function GET(request, { params }) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const docId = params.id.toString();

    await connectToDatabase();
    const documentExists = await documentModel.findById(docId);

    if (!documentExists) {
      return responseTemplate(404, {
        message: "Failed to fetch the document",
      });
    }

    return responseTemplate(200, {
      document: documentExists,
      message: "Document fetched successfully",
    });
  } catch (error) {
    console.log("ERROR", error);
    return responseTemplate(404, error);
  }
}
