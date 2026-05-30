import CompareClient from "@/components/CompareClient";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function getData() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/compensations`,
  {
    cache: "no-store",
  }
);

  if (!res.ok) {
    throw new Error("Failed to fetch comparison data");
  }

  return res.json();
}

export default async function ComparePage() {
  const data = await getData();
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#f4efe6] text-[#1c1a17] [background-image:radial-gradient(1200px_600px_at_80%_-10%,#fbf8f2_0%,transparent_60%)]">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e3dccd] bg-[#f4efe6]/95 px-6 py-3 backdrop-blur-sm">
        <nav className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Dashboard
          </Link>
          <Link href="/compare" className="font-semibold text-[#9a7b3f]">
            Compare
          </Link>
          <Link
            href="/saved"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Saved
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <header>
          <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9a7b3f]">
            Salary Intelligence
          </div>
          <h1 className="font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl">
            Compare, <em className="italic text-[#9a7b3f]">side by side</em>
          </h1>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-[#6b6459]">
            Select two compensation records to compare them directly.
          </p>
        </header>

        <div className="my-9 h-px bg-gradient-to-r from-[#e3dccd] to-transparent" />

        <CompareClient data={data} />
      </div>
    </div>
  );
}
