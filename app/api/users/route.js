import usersModel from "@/models/user";
import documentModel from "@/models/document";
import connectToDatabase from "@/lib/db-connect";
import authCheck from "@/utils/api/auth/check-auth";
import responseTemplate from "@/utils/api/response-template";

const getUsersListFromSearchString = async (search, userId) => {
  try {
    const regex = new RegExp(search.toString(), "i");

    const usersList = await usersModel.find({
      $or: [{ name: { $regex: regex } }, { username: { $regex: regex } }],
    });

    if (!usersList) {
      return responseTemplate(404, {
        message: "Failed to fetch users",
      });
    }

    return responseTemplate(200, {
      usersList: usersList.filter((el) => el._id.toString() !== userId),
      message: "Users fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
};

const getUsersListWithAccessToDocs = async (docId) => {
  try {
    const document = await documentModel.findById(docId);

    if (!document) {
      return responseTemplate(404, {
        message: "Document not found!",
      });
    }

    const userIds = [
      document.ownerId.toString(),
      [...document.viewers],
      [...document.editors],
    ];

    console.log("userIds", userIds);

    const usersList = await usersModel.find({
      _id: {
        $in: userIds,
      },
    });

    if (!usersList) {
      return responseTemplate(404, {
        message: "Failed to fetch users",
      });
    }

    return responseTemplate(200, {
      usersList,
      message: "Users fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
};

export async function GET(request) {
  try {
    const checkAuth = await authCheck(request);
    if (!checkAuth.auth) return checkAuth.response;

    const userId = checkAuth.response.payload.id;

    const url = new URL(request.url);

    const docId = url.searchParams.get("docId");
    const search = url.searchParams.get("search");

    await connectToDatabase();
    let response;

    if (docId) {
      response = await getUsersListWithAccessToDocs(docId);
      return response;
    }

    if (search) {
      response = await getUsersListFromSearchString(search, userId);
      return response;
    }
  } catch (error) {
    return responseTemplate(404, error);
  }
}
