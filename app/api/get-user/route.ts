// to get the session on the server
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { create } from "@/actions/user/get-user";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 400 })
    }

    create()
    return NextResponse.json({ success: session }, { status: 200 })
}