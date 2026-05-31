import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SavedClient from "@/components/SavedClient";

export default async function SavedPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  // 1. Fetch saved comparisons
  const savedList = await prisma.savedComparison.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // 2. Extract unique compensation IDs
  const compIds = Array.from(
    new Set(
      savedList.flatMap((item) => [item.leftComp, item.rightComp])
    )
  );

  // 3. Fetch all matching compensations in one query
  const compensations = await prisma.compensation.findMany({
    where: { id: { in: compIds } },
    include: { company: true },
  });

  // 4. Map for quick lookup
  const compMap = new Map(compensations.map((c) => [c.id, c]));

  // 5. Enrich and serialize data for client component
  const serializedComparisons = savedList.map((item) => {
    const leftComp = compMap.get(item.leftComp) || null;
    const rightComp = compMap.get(item.rightComp) || null;

    return {
      id: item.id,
      createdAt: item.createdAt.toISOString(),
      left: leftComp
        ? {
            id: leftComp.id,
            role: leftComp.role,
            level: leftComp.level,
            location: leftComp.location,
            totalComp: leftComp.totalComp,
            company: {
              name: leftComp.company.name,
            },
          }
        : null,
      right: rightComp
        ? {
            id: rightComp.id,
            role: rightComp.role,
            level: rightComp.level,
            location: rightComp.location,
            totalComp: rightComp.totalComp,
            company: {
              name: rightComp.company.name,
            },
          }
        : null,
    };
  });

  return (
    <div className="min-h-screen bg-[#f4efe6] px-6 py-14 text-[#1c1a17] [background-image:radial-gradient(1200px_600px_at_80%_-10%,#fbf8f2_0%,transparent_60%)]">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Dashboard
          </Link>
          <Link
            href="/compare"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Compare
          </Link>
          <Link href="/saved" className="font-semibold text-[#9a7b3f]">
            Saved
          </Link>
        </nav>

        <header>
          <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9a7b3f]">
            Salary Intelligence
          </div>
          <h1 className="font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl">
            Saved, <em className="italic text-[#9a7b3f]">for later</em>
          </h1>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-[#6b6459]">
            Your saved compensation comparisons, ready to revisit.
          </p>
        </header>

        <div className="my-9 h-px bg-gradient-to-r from-[#e3dccd] to-transparent" />

        <SavedClient initialComparisons={serializedComparisons} />
      </div>
    </div>
  );
}
