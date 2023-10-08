import requestModel from "@/models/request";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

export async function POST(request, { params }) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const docId = params.id.toString();
    const userId = checkAuth.response.payload.id;

    await connectToDatabase();

    const documentExists = await documentModel.findById(docId);

    if (!documentExists) {
      return responseTemplate(404, { message: "This document does not exist" });
    }

    const requestObj = {
      from: userId.toString(),
      docId: docId.toString(),
      docName: documentExists.name,
      to: documentExists.ownerId.toString(),
    };

    const requestExists = await requestModel.findOne({
      docId: docId.toString(),
    });

    if (requestExists) {
      await requestModel.findByIdAndUpdate(
        { _id: requestExists._id.toString() },
        { updatedAt: new Date() }
      );

      return responseTemplate(200, {
        ...requestExists._doc,
        updatedAt: new Date(),
      });
    }

    const newRequest = new requestModel(requestObj);
    const requestInfo = await newRequest.save();

    return responseTemplate(200, requestInfo);
  } catch (error) {
    return responseTemplate(404, error);
  }
}
