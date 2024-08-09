import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const source = searchParams.get("source");
  const income = searchParams.get("income");
  const month = searchParams.get("month");
  const date = searchParams.get("date");
  const totalIncome = searchParams.get("totalIncome");

  try {
    if (!uid) throw new Error("uid required");
    await sql`INSERT INTO income (userid, source, income, month, date) VALUES (${uid}, ${source},${income},${month},${date});`;
    await sql`UPDATE users SET income = income+${income} where userid = ${uid}`;
    const incomeUser = await sql`SELECT * FROM income where userid=${uid}`;
    return NextResponse.json({ incomeUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
