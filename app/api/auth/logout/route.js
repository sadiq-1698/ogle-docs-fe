import responseTemplate from "@/utils/api/response-template";

export async function GET() {
  try {
    responseTemplate(200, { message: "Logged out!" });

    const response = responseTemplate(200, { message: "Logged out!" });

    response.cookies.delete("accessToken");

    return response;
  } catch (error) {
    return responseTemplate(404, error);
  }
}
