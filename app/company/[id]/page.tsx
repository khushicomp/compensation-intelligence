import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: { id: Number(id) },
    include: { compensations: true },
  });

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4efe6]">
        <p className="font-serif italic text-[#a59c8d]">
          Company not found.
        </p>
      </div>
    );
  }

  const avgComp =
    company.compensations.reduce((sum, item) => sum + item.totalComp, 0) /
    company.compensations.length;

  return (
    <div className="min-h-screen bg-[#f4efe6] px-6 py-14 text-[#1c1a17] [background-image:radial-gradient(1200px_600px_at_80%_-10%,#fbf8f2_0%,transparent_60%)]">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            ← Dashboard
          </Link>
          <Link
            href="/compare"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Compare
          </Link>
        </nav>

        <header>
          <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9a7b3f]">
            Company Profile
          </div>
          <h1 className="font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl">
            {company.name}
          </h1>
        </header>

        <div className="my-9 h-px bg-gradient-to-r from-[#e3dccd] to-transparent" />

        <div className="mb-9 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#e3dccd] bg-[#fbf8f2] sm:grid-cols-2">
          <div className="px-7 py-6">
            <div className="font-serif text-4xl font-medium leading-none tracking-tight tabular-nums">
              <span className="mr-px text-[#9a7b3f]">₹</span>
              {Math.round(avgComp).toLocaleString("en-IN")}
            </div>
            <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a59c8d]">
              Avg Compensation
            </div>
          </div>
          <div className="border-t border-[#e3dccd] px-7 py-6 sm:border-l sm:border-t-0">
            <div className="font-serif text-4xl font-medium leading-none tracking-tight">
              {company.compensations.length}
            </div>
            <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a59c8d]">
              Total Records
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#e3dccd] bg-[#fbf8f2] shadow-[0_20px_50px_-30px_rgba(60,50,30,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#9a7b3f]/5">
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    Role
                  </th>
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    Level
                  </th>
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    Location
                  </th>
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-right text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    Total Comp
                  </th>
                </tr>
              </thead>
              <tbody>
                {company.compensations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e3dccd] transition-colors last:border-b-0 hover:bg-[#9a7b3f]/[0.045]"
                  >
                    <td className="px-6 py-[18px] text-[15px] font-semibold text-[#1c1a17]">
                      {item.role}
                    </td>
                    <td className="px-6 py-[18px]">
                      <span className="inline-flex items-center rounded-full border border-[#3d5a4c]/20 bg-[#3d5a4c]/10 px-[11px] py-1 text-[11px] font-semibold tracking-wide text-[#3d5a4c]">
                        {item.level}
                      </span>
                    </td>
                    <td className="px-6 py-[18px] text-[#6b6459]">
                      {item.location}
                    </td>
                    <td className="whitespace-nowrap px-6 py-[18px] text-right font-serif text-base font-medium tabular-nums text-[#1c1a17]">
                      <span className="mr-px text-[#9a7b3f]">₹</span>
                      {item.totalComp.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
