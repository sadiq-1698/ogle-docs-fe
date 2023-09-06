import bcrypt from "bcrypt";
import userModel from "../../../models/user";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db-connect";

const BCRYPT_SALT_ROUNDS = 12;

export async function POST(request) {
  try {
    const json = await request.json();

    console.log("json", json);

    await connectToDatabase();

    const { username, name, password } = request.body;

    const userExists = await userModel.findOne({ username: username });

    if (userExists)
      new NextResponse(
        JSON.stringify({ message: "Username has already been taken" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );

    const _password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = new userModel({
      name: name,
      username: username,
      password: _password,
    });

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Registered successfully" }),
      {
        status: 201,
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
