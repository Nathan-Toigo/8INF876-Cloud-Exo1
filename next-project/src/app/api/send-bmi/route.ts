import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { UUID } from "uuidjs";

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
    const formData = await req.formData();
    const weight = parseFloat(formData.get("weight") as string);
    const height = parseFloat(formData.get("height") as string);
    const nickname = formData.get("nickname") as string;


    if (!weight || !height || !nickname) {
      return NextResponse.json({ error: "Missing field.s" }, { status: 400 });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    

    try{
        const uuid = UUID.generate();

        const db = await getServerSideProps();
        
        await db.execute(
        "INSERT INTO bmi_records (uuid, weight, height, bmi, nickname, date) VALUES (?, ?, ?, ?, ?, NOW())",
        [uuid, weight, height, bmi, nickname]
        );
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ROOT_URL}/bmi-result?uuid=${uuid}`);

    } catch (err) {
      console.error("Error inserting data:", err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}