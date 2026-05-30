import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leftComp, rightComp } = await req.json();

  const saved = await prisma.savedComparison.create({
    data: {
      userId,
      leftComp,
      rightComp,
    },
  });

  return NextResponse.json(saved);
}
