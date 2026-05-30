import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.compensation.findMany({
      include: { company: true },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/compensations]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}