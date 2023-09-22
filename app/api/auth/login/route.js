import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
import userModel from "../../../../models/user";
import connectToDatabase from "@/lib/db-connect";
import responseTemplate from "@/utils/api/response-template";

function createUserInfoObject(allowedInfo, userObject) {
  let result = {};
  for (let i = 0; i < allowedInfo.length; i++) {
    if (userObject[allowedInfo[i]]) {
      result[allowedInfo[i]] = userObject[allowedInfo[i]];
    }
  }
  return result;
}

export async function POST(request) {
  try {
    const jsonBody = await request.json();

    await connectToDatabase();

    const { username, password } = jsonBody;

    const allowedUserInfo = ["_id", "name", "username"];

    const userExists = await userModel.findOne({ username: username });

    if (!userExists) {
      return responseTemplate(404, { message: "User does not exist" });
    }

    const userInfo = createUserInfoObject(allowedUserInfo, userExists);

    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
      return responseTemplate(403, { message: "Incorrect email/password" });
    }

    const jwtToken = await new SignJWT({ id: userExists._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${3600 * 24}s`)
      .sign(getJwtSecretKey());

    const response = responseTemplate(200, { ...userInfo });

    response.cookies.set({
      name: "accessToken",
      value: jwtToken,
      path: "/",
    });

    return response;
  } catch (error) {
    return responseTemplate(404, error);
  }
}
