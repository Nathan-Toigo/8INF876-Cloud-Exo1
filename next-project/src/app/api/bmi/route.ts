import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const weight = parseFloat(formData.get("weight") as string);
    const height = parseFloat(formData.get("height") as string);

    if (!weight || !height) {
      return NextResponse.json({ error: "Missing weight or height" }, { status: 400 });
    }

    const bmi = weight / (height * height);
    return NextResponse.json({ bmi: bmi });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
