import usersModel from "@/models/user";
import connectToDatabase from "@/lib/db-connect";
import responseTemplate from "@/utils/api/response-template";

export async function GET(request) {
  try {
    const url = new URL(request.url);

    const docId = url.searchParams.get("docId");

    console.log("docId", docId);

    const userIds = ["650dd334103dbe308f25dd77", "65116b57508784153da9113d"];

    await connectToDatabase();
    const usersList = await usersModel.find({
      _id: {
        $in: userIds,
      },
    });

    if (!usersList) {
      return responseTemplate(404, {
        message: "Failed to fetch the documents",
      });
    }

    console.log(usersList);

    return responseTemplate(200, {
      usersList,
      message: "Document fetched successfully",
    });
  } catch (error) {
    return responseTemplate(404, error);
  }
}
