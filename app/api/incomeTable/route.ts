import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  try {
    if (!uid) throw new Error("uid required");
    const incomeUser = await sql`SELECT * FROM income where userid=${uid}`;
    return NextResponse.json({ incomeUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
