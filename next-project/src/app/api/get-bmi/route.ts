import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function getServerSideProps() {
  const db = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});
  return db;
}

export async function POST(req: NextRequest) {
  try {
    const { uuid } = await req.json();

    if (!uuid) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const db = await getServerSideProps();
    
    const [rows] = await db.execute<any[]>("SELECT * FROM bmi_records WHERE uuid = ?", [uuid]);
    const record = rows[0];

    if (!record) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }

    return NextResponse.json(record);

  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}