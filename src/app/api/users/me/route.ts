import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  //* extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findById({ _id: userId }).select("-password");

  // check if there is no user
  if (!user) {
    return NextResponse.json(
      {
        message: "No user found",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
