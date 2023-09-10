import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import userModel from "../../../../models/user";
import connectToDatabase from "@/lib/db-connect";

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

    const allowedUserInfo = ["_id", "name", "usernme"];

    const userExists = await userModel.findOne({ username: username });

    if (!userExists)
      return new NextResponse(
        JSON.stringify({ message: "User does not exist" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );

    const userInfo = createUserInfoObject(allowedUserInfo, userExists);

    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email/password" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const jwtToken = jwt.sign({ id: userExists._id }, process.env.SECRET);

    return new NextResponse(
      JSON.stringify({ ...userInfo, userToken: jwtToken }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
