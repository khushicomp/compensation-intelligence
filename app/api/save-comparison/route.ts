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

export async function DELETE(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Comparison ID required" }, { status: 400 });
    }

    // Verify ownership before deleting
    const comparison = await prisma.savedComparison.findUnique({
      where: { id: Number(id) },
    });

    if (!comparison) {
      return NextResponse.json({ error: "Comparison not found" }, { status: 404 });
    }

    if (comparison.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.savedComparison.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/save-comparison]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
