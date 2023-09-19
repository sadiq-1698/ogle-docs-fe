import mongoose from "mongoose";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

const connection = mongoose.connection;

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
    return responseTemplate(404, error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const docId = params.id.toString();
    const userId = checkAuth.response.payload.id;

    await connectToDatabase();
    const session = await connection.startSession();

    session.startTransaction();

    const response = documentModel.findByIdAndDelete(
      docId,
      async function (err, doc) {
        if (err) {
          return responseTemplate(404, err);
        } else {
          if (doc.userId !== userId) {
            await session.abortTransaction();
            return responseTemplate(403, {
              message: "Unauthorized!",
            });
          }
          await session.commitTransaction();
          return responseTemplate(200, {
            message: "Document deleted successfully",
          });
        }
      }
    );

    return response;
  } catch (error) {
    return responseTemplate(404, error);
  } finally {
    session.endSession();
  }
}
