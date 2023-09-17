import bcrypt from "bcrypt";
import userModel from "../../../../models/user";
import connectToDatabase from "@/lib/db-connect";
import responseTemplate from "@/utils/api/response-template";

const BCRYPT_SALT_ROUNDS = 12;

export async function POST(request) {
  try {
    const jsonBody = await request.json();

    await connectToDatabase();

    const { username, name, password } = jsonBody;

    const userExists = await userModel.findOne({ username: username });

    if (userExists) {
      return responseTemplate(409, {
        message: "Username has already been taken",
      });
    }

    const _password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = new userModel({
      name: name,
      username: username,
      password: _password,
    });

    await user.save();

    return responseTemplate(201, { message: "Registered successfully" });
  } catch (error) {
    return responseTemplate(404, error);
  }
}
