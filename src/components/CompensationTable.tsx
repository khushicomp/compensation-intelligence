"use client";
import Link from "next/link";
import { useState } from "react";

export default function CompensationTable({
  data,
}: {
  data: any[];
}) {
  const [search, setSearch] = useState("");

  const companies = [
    "All",
    ...new Set(data.map((item) => item.company.name)),
  ];

  const [selectedCompany, setSelectedCompany] =
    useState("All");

  const locations = [
    "All",
    ...new Set(data.map((item) => item.location)),
  ];

  const [selectedLocation, setSelectedLocation] =
    useState("All");

  const filtered = data.filter((item) => {
    const matchesSearch = item.company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCompany =
      selectedCompany === "All" ||
      item.company.name === selectedCompany;

    const matchesLocation =
      selectedLocation === "All" ||
      item.location === selectedLocation;

    return matchesSearch && matchesCompany && matchesLocation;
  });

  const stats = [
    { label: "Companies", value: companies.length - 1 },
    { label: "Records", value: data.length },
    { label: "Locations", value: locations.length - 1 },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe6] px-6 py-14 text-[#1c1a17] [background-image:radial-gradient(1200px_600px_at_80%_-10%,#fbf8f2_0%,transparent_60%)]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header>
          <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9a7b3f]">
            Salary Intelligence
          </div>
          <h1 className="font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl">
            Compensation, <em className="italic text-[#9a7b3f]">illuminated</em>
          </h1>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-[#6b6459]">
            A curated view of pay across companies, roles, and cities — search,
            filter, and compare with clarity.
          </p>
        </header>

        <div className="my-9 h-px bg-gradient-to-r from-[#e3dccd] to-transparent" />

        {/* Stats */}
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#e3dccd] bg-[#fbf8f2] sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-7 py-6 ${
                i > 0
                  ? "border-t border-[#e3dccd] sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <div className="font-serif text-4xl font-medium leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a59c8d]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mb-6 mt-8 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[280px] flex-1">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a59c8d]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#e3dccd] bg-[#fbf8f2] py-3 pl-11 pr-4 text-sm text-[#1c1a17] outline-none transition placeholder:text-[#a59c8d] focus:border-[#c2a368] focus:ring-4 focus:ring-[#c2a368]/15"
            />
          </div>

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-[#e3dccd] bg-[#fbf8f2] bg-[length:12px] bg-[right_16px_center] bg-no-repeat py-3 pl-[18px] pr-9 text-sm text-[#1c1a17] outline-none transition focus:border-[#c2a368] focus:ring-4 focus:ring-[#c2a368]/15 [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%23a59c8d%22_stroke-width=%222.5%22%3E%3Cpath_d=%22M6_9l6_6_6-6%22/%3E%3C/svg%3E')]"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company === "All" ? "All companies" : company}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-[#e3dccd] bg-[#fbf8f2] bg-[length:12px] bg-[right_16px_center] bg-no-repeat py-3 pl-[18px] pr-9 text-sm text-[#1c1a17] outline-none transition focus:border-[#c2a368] focus:ring-4 focus:ring-[#c2a368]/15 [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%23a59c8d%22_stroke-width=%222.5%22%3E%3Cpath_d=%22M6_9l6_6_6-6%22/%3E%3C/svg%3E')]"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location === "All" ? "All locations" : location}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[18px] border border-[#e3dccd] bg-[#fbf8f2] shadow-[0_20px_50px_-30px_rgba(60,50,30,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                
                <tr className="bg-[#9a7b3f]/5">
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    Company
                  </th>
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
                  <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-center text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e3dccd] transition-colors last:border-b-0 hover:bg-[#9a7b3f]/[0.045]"
                  >
                    <td className="px-6 py-[18px] text-[15px] font-semibold text-[#1c1a17]">
                      {item.company.name}
                    </td>
                    <td className="px-6 py-[18px] text-[#6b6459]">{item.role}</td>
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

<td className="px-6 py-[18px] text-center">
  <Link
    href={`/company/${item.company.id}`}
    className="inline-flex items-center rounded-full bg-[#9a7b3f] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
  >
    View
  </Link>
</td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center font-serif text-base italic text-[#a59c8d]"
                    >
                      Nothing matches your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        

        {/* Footer */}
        <div className="mt-[18px] flex flex-wrap justify-between gap-2 text-xs tracking-wide text-[#a59c8d]">
          <span>
            Showing {filtered.length} of {data.length} records
          </span>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
}

