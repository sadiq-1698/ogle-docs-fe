import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

export async function POST(request) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const jsonBody = await request.json();
    const ownerId = checkAuth.response.payload.id;
    const { name, content, isStarred, isTemplate } = jsonBody;

    const docObj = {
      name,
      ownerId,
      content,
      ...(isStarred && { isStarred: isStarred }),
      ...(isTemplate && { isTemplate: isTemplate }),
    };

    await connectToDatabase();
    const document = new documentModel(docObj);
    const docDetails = await document.save();

    return responseTemplate(201, {
      docId: docDetails._id,
      message: "Document created successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}

export async function GET(request) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const userId = checkAuth.response.payload.id;

    await connectToDatabase();
    const documentsList = await documentModel.find({ ownerId: userId });

    if (!documentsList) {
      return responseTemplate(404, {
        message: "Failed to fetch the documents",
      });
    }

    return responseTemplate(200, {
      documentsList,
      message: "Document fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}

export async function DELETE(request) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    await connectToDatabase();
    await documentModel.deleteMany({});

    return responseTemplate(200, {
      message: "Documents cleared successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}
