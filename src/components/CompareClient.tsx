"use client";

import { useState } from "react";

export default function CompareClient({
  data,
  initialLeftId,
  initialRightId,
}: {
  data: any[];
  initialLeftId?: number;
  initialRightId?: number;
}) {
  const [leftId, setLeftId] = useState(() => {
    if (initialLeftId && data.some(item => item.id === initialLeftId)) {
      return initialLeftId;
    }
    return data[0]?.id;
  });
  const [rightId, setRightId] = useState(() => {
    if (initialRightId && data.some(item => item.id === initialRightId)) {
      return initialRightId;
    }
    return data[1]?.id || data[0]?.id;
  });

  const left = data.find((item) => item.id === Number(leftId));
  const right = data.find((item) => item.id === Number(rightId));

  if (!left || !right) {
    return (
      <p className="font-serif italic text-[#a59c8d]">
        No data available for comparison.
      </p>
    );
  }

  const winner = left.totalComp > right.totalComp ? left : right;

  const selectClass =
    "cursor-pointer appearance-none rounded-full border border-[#e3dccd] bg-[#fbf8f2] bg-[length:12px] bg-[right_16px_center] bg-no-repeat py-3 pl-[18px] pr-9 text-sm text-[#1c1a17] outline-none transition focus:border-[#c2a368] focus:ring-4 focus:ring-[#c2a368]/15 [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%23a59c8d%22_stroke-width=%222.5%22%3E%3Cpath_d=%22M6_9l6_6_6-6%22/%3E%3C/svg%3E')]";

  const rows = [
    { label: "Role", leftVal: left.role, rightVal: right.role },
    { label: "Level", leftVal: left.level, rightVal: right.level },
    { label: "Location", leftVal: left.location, rightVal: right.location },
    {
      label: "Base Salary",
      leftVal: `₹${left.baseSalary.toLocaleString("en-IN")}`,
      rightVal: `₹${right.baseSalary.toLocaleString("en-IN")}`,
    },
    {
      label: "Bonus",
      leftVal: `₹${left.bonus.toLocaleString("en-IN")}`,
      rightVal: `₹${right.bonus.toLocaleString("en-IN")}`,
    },
    {
      label: "Stock",
      leftVal: `₹${left.stock.toLocaleString("en-IN")}`,
      rightVal: `₹${right.stock.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <>
      {/* Selectors */}
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={leftId}
          onChange={(e) => setLeftId(Number(e.target.value))}
          className={selectClass}
        >
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.company.name} - {item.role} - {item.level} - {item.location}
            </option>
          ))}
        </select>

        <select
          value={rightId}
          onChange={(e) => setRightId(Number(e.target.value))}
          className={selectClass}
        >
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.company.name} - {item.role} - {item.level} - {item.location}
            </option>
          ))}
        </select>
      </div>

      {/* Winner card */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[#c2a368]/40 bg-[#9a7b3f]/[0.06] px-7 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b3f]">
          Better Offer
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 font-serif text-xl font-medium text-[#1c1a17]">
          {winner.company.name} — {winner.role}
          <span className="inline-flex items-center rounded-full border border-[#3d5a4c]/20 bg-[#3d5a4c]/10 px-[11px] py-0.5 font-sans text-[11px] font-semibold tracking-wide text-[#3d5a4c]">
            {winner.level}
          </span>
        </div>
        <div className="mt-1 font-serif text-2xl font-medium tabular-nums text-[#1c1a17]">
          <span className="mr-px text-[#9a7b3f]">₹</span>
          {winner.totalComp.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-hidden rounded-[18px] border border-[#e3dccd] bg-[#fbf8f2] shadow-[0_20px_50px_-30px_rgba(60,50,30,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#9a7b3f]/5">
                <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                  Metric
                </th>
                <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                  {left.company.name}
                </th>
                <th className="whitespace-nowrap border-b border-[#e3dccd] px-6 py-[18px] text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                  {right.company.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, leftVal, rightVal }) => (
                <tr
                  key={label}
                  className="border-b border-[#e3dccd] transition-colors last:border-b-0 hover:bg-[#9a7b3f]/[0.045]"
                >
                  <td className="px-6 py-[18px] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                    {label}
                  </td>
                  <td className="px-6 py-[18px] text-[#1c1a17]">{leftVal}</td>
                  <td className="px-6 py-[18px] text-[#1c1a17]">{rightVal}</td>
                </tr>
              ))}
              <tr className="border-b border-[#e3dccd] transition-colors last:border-b-0 hover:bg-[#9a7b3f]/[0.045]">
                <td className="px-6 py-[18px] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#a59c8d]">
                  Total Compensation
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-[18px] font-serif text-base font-medium tabular-nums ${
                    left.totalComp > right.totalComp
                      ? "text-[#3d5a4c]"
                      : "text-[#1c1a17]"
                  }`}
                >
                  <span className="mr-px text-[#9a7b3f]">₹</span>
                  {left.totalComp.toLocaleString("en-IN")}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-[18px] font-serif text-base font-medium tabular-nums ${
                    right.totalComp > left.totalComp
                      ? "text-[#3d5a4c]"
                      : "text-[#1c1a17]"
                  }`}
                >
                  <span className="mr-px text-[#9a7b3f]">₹</span>
                  {right.totalComp.toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={saveComparison}
        className="mt-6 inline-flex items-center rounded-full bg-[#9a7b3f] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Save Comparison
      </button>
    </>
  );

  async function saveComparison() {
    const res = await fetch("/api/save-comparison", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leftComp: left.id, rightComp: right.id }),
    });

    if (res.ok) {
      alert("Comparison saved!");
    }
  }
}
