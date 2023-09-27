import usersModel from "@/models/user";
import connectToDatabase from "@/lib/db-connect";
import responseTemplate from "@/utils/api/response-template";

const getUsersListFromSearchString = async (search) => {
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
      usersList,
      message: "Users fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
};

const getUsersListWithAccessToDocs = async () => {
  const userIds = ["650dd334103dbe308f25dd77", "65116b57508784153da9113d"];

  try {
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
    const url = new URL(request.url);

    const docId = url.searchParams.get("docId");
    const search = url.searchParams.get("search");

    await connectToDatabase();
    let response;

    if (docId) {
      response = await getUsersListWithAccessToDocs();
      return response;
    }

    if (search) {
      response = await getUsersListFromSearchString(search);
      return response;
    }
  } catch (error) {
    return responseTemplate(404, error);
  }
}
