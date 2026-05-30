import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SavedPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const data = await prisma.savedComparison.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
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

        {data.length === 0 ? (
          <div className="rounded-[18px] border border-[#e3dccd] bg-[#fbf8f2] px-6 py-14 text-center">
            <p className="font-serif italic text-[#a59c8d]">
              No saved comparisons yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[18px] border border-[#e3dccd] bg-[#fbf8f2] shadow-[0_20px_50px_-30px_rgba(60,50,30,0.4)]">
            <div className="divide-y divide-[#e3dccd]">
              {data.map((item: any) => (
                <div
                  key={item.id}
                  className="px-6 py-5 transition-colors hover:bg-[#9a7b3f]/[0.045]"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a59c8d]">
                    Comparison #{item.id}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#6b6459]">
                    <span>
                      <span className="font-medium text-[#1c1a17]">Left:</span>{" "}
                      {item.leftComp}
                    </span>
                    <span>
                      <span className="font-medium text-[#1c1a17]">Right:</span>{" "}
                      {item.rightComp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
