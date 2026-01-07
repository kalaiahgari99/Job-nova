"use client";

import { useState } from "react";

type TabKey = "matched" | "liked" | "applied";

export default function StatusTabs() {
  const [active, setActive] = useState<TabKey>("matched");

  return (
    <div className="flex items-center gap-6 border-b pb-4">
      {/* Matched */}
      <button
        onClick={() => setActive("matched")}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition
          ${
            active === "matched"
              ? "border border-purple-500 text-purple-600 bg-purple-50"
              : "text-gray-500"
          }`}
      >
        Matched
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300" />

      {/* Liked */}
      <button
        onClick={() => setActive("liked")}
        className="flex items-center gap-2 text-sm font-medium text-gray-500"
      >
        Liked
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-semibold text-white">
          1
        </span>
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300" />

      {/* Applied */}
      <button
        onClick={() => setActive("applied")}
        className="flex items-center gap-2 text-sm font-medium text-gray-500"
      >
        Applied
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-semibold text-white">
          1
        </span>
      </button>
    </div>
  );
}
