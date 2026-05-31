"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SavedComparisonItem {
  id: number;
  createdAt: string;
  left: {
    id: number;
    role: string;
    level: string;
    location: string;
    totalComp: number;
    company: {
      name: string;
    };
  } | null;
  right: {
    id: number;
    role: string;
    level: string;
    location: string;
    totalComp: number;
    company: {
      name: string;
    };
  } | null;
}

export default function SavedClient({
  initialComparisons,
}: {
  initialComparisons: SavedComparisonItem[];
}) {
  const [comparisons, setComparisons] = useState<SavedComparisonItem[]>(initialComparisons);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();

  const formatLakhs = (amount: number) => {
    const l = amount / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this saved comparison?")) {
      return;
    }
    
    setIsDeleting(id);
    try {
      const res = await fetch("/api/save-comparison", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setComparisons((prev) => prev.filter((item) => item.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete comparison.");
      }
    } catch (error) {
      console.error("Delete comparison error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (comparisons.length === 0) {
    return (
      <div className="rounded-[22px] border border-[#e3dccd] bg-[#fbf8f2] px-6 py-16 text-center">
        <p className="font-serif italic text-[#a59c8d] text-lg">
          No saved comparisons yet. Go to the dashboard or compare page to start saving!
        </p>
        <Link
          href="/compare"
          className="mt-6 inline-flex items-center rounded-full bg-[#9a7b3f] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Compare Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {comparisons.map((item) => {
        const leftName = item.left
          ? `${item.left.company.name} ${item.left.role} ${item.left.level} (${formatLakhs(item.left.totalComp)})`
          : "Deleted Record";

        const rightName = item.right
          ? `${item.right.company.name} ${item.right.role} ${item.right.level} (${formatLakhs(item.right.totalComp)})`
          : "Deleted Record";

        const canOpen = item.left !== null && item.right !== null;

        return (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-[20px] border border-[#e3dccd] bg-[#fbf8f2] p-6 transition-all duration-300 hover:border-[#c2a368]/60 hover:shadow-[0_15px_35px_-15px_rgba(60,50,30,0.15)] ${
              isDeleting === item.id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              {/* Comparison Details */}
              <div className="flex-1">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a59c8d]">
                  Saved on {formatDate(item.createdAt)}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Left Side */}
                  <div className="flex-1">
                    {item.left ? (
                      <div>
                        <div className="font-serif text-lg font-medium text-[#1c1a17]">
                          {item.left.company.name}
                        </div>
                        <div className="text-sm text-[#6b6459] mt-0.5">
                          {item.left.role} &middot; {item.left.level}
                        </div>
                        <div className="mt-1 font-serif text-[17px] font-semibold text-[#9a7b3f] tabular-nums">
                          {formatLakhs(item.left.totalComp)}
                        </div>
                      </div>
                    ) : (
                      <div className="font-serif italic text-[#a59c8d]">
                        Record unavailable
                      </div>
                    )}
                  </div>

                  {/* VS Divider */}
                  <div className="flex py-1 sm:py-0 sm:px-4 items-center justify-start sm:justify-center">
                    <span className="rounded-full border border-[#e3dccd] bg-[#f4efe6] px-3 py-1 font-serif text-xs italic font-medium text-[#9a7b3f]">
                      vs
                    </span>
                  </div>

                  {/* Right Side */}
                  <div className="flex-1">
                    {item.right ? (
                      <div>
                        <div className="font-serif text-lg font-medium text-[#1c1a17]">
                          {item.right.company.name}
                        </div>
                        <div className="text-sm text-[#6b6459] mt-0.5">
                          {item.right.role} &middot; {item.right.level}
                        </div>
                        <div className="mt-1 font-serif text-[17px] font-semibold text-[#9a7b3f] tabular-nums">
                          {formatLakhs(item.right.totalComp)}
                        </div>
                      </div>
                    ) : (
                      <div className="font-serif italic text-[#a59c8d]">
                        Record unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-[#e3dccd]/50 pt-4 md:border-t-0 md:pt-0">
                {canOpen && (
                  <Link
                    href={`/compare?left=${item.left?.id}&right=${item.right?.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#e3dccd] bg-white px-5 py-2 text-sm font-semibold text-[#1c1a17] transition hover:border-[#c2a368] hover:text-[#9a7b3f]"
                  >
                    Open Comparison
                  </Link>
                )}
                
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting === item.id}
                  className="inline-flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-5 py-2 text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
