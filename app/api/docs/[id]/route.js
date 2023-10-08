import mongoose from "mongoose";
import { NextResponse } from "next/server";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";
import { RESTRICTED } from "@/enums";

const connection = mongoose.connection;

export async function GET(request, { params }) {
  const { url } = request;

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

    const hasAccess = [
      documentExists.ownerId.toString(),
      ...documentExists.viewers.map((el) => el.toString()),
      ...documentExists.editors.map((el) => el.toString()),
    ].includes(checkAuth.response.payload.id);

    if (!hasAccess && documentExists.accessType === RESTRICTED) {
      return responseTemplate(403, {
        message: "You do not have access to this document",
      });
    }

    return responseTemplate(200, {
      document: documentExists,
      message: "Document fetched successfully",
    });
  } catch (error) {
    console.log(error);
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
          if (doc.ownerId !== userId) {
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

export async function PUT(request, { params }) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const docId = params.id.toString();
    const userId = checkAuth.response.payload.id;

    const jsonBody = await request.json();

    const {
      name,
      content,
      editors,
      viewers,
      ownerId,
      isStarred,
      createdAt,
      isTemplate,
      accessType,
    } = jsonBody;

    await connectToDatabase();

    let updateObj = {
      name,
      content,
      editors,
      viewers,
      ownerId,
      isStarred,
      createdAt,
      isTemplate,
      accessType,
      updatedAt: new Date(),
    };

    await documentModel.findByIdAndUpdate({ _id: docId }, updateObj);

    return responseTemplate(200, {
      message: "Document updated successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}
