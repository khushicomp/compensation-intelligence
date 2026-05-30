import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.compensation.findMany({
    include: {
      company: true,
    },
  });

  return NextResponse.json(data);
}