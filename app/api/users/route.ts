import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { uid } = await request.json();

  try {
    if (!uid) throw new Error("uid required");
    await sql`INSERT INTO users (userid, income) VALUES (${uid}, 0) ON CONFLICT (userid) DO NOTHING;`;
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
