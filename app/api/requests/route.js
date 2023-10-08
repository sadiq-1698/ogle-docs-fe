import requestModel from "@/models/request";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

export async function GET(request) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const userId = checkAuth.response.payload.id;

    await connectToDatabase();
    const requestsList = await requestModel.find({ to: userId.toString() });

    if (!requestsList) {
      return responseTemplate(404, {
        message: "Failed to fetch the documents",
      });
    }

    return responseTemplate(200, {
      requestsList,
      message: "Document fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}
