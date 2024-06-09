import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // validation
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exits",
        },
        {
          status: 500,
        }
      );
    }
    console.log("User exits");

    const isMatched = await bcryptjs.compare(password, user.password);

    if (!isMatched) {
      return NextResponse.json(
        { error: "Check your credentials" },
        {
          status: 400,
        }
      );
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "7 days",
    });

    const response = NextResponse.json({
      message: "Logged in success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
