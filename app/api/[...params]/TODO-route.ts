import apiRequest from "@/actions/base-api-request/apiRequest";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest) {
  const {
    method,
    query: { params = [] },
    body,
  } = req;

  try {
    const getdata = await apiRequest(
      method as string,
      "",
      body,
      Array.isArray(params) ? params : [params]
    );
    console.log("GET Response:", getdata);
    return NextResponse.json(
      { message: "GET request successful", getdata },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST };
