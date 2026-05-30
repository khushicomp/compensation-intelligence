import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      compensations: true,
    },
  });

  return NextResponse.json(company);
}