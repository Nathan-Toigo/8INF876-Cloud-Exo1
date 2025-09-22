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

export async function GET(req: NextRequest) {
  try {
    const db = await getServerSideProps();
    
    const [rows] = await db.execute<any[]>("SELECT * FROM bmi_records ORDER BY date LIMIT 10");
    const records = JSON.stringify(rows);

    return NextResponse.json({ records:records }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}