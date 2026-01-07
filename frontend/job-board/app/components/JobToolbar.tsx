"use client";

import { useState } from "react";

export default function JobToolbar() {
  const [sort, setSort] = useState("Top matched");

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Change Job Reference */}
      <button
        type="button"
        className="flex-1 rounded-full bg-purple-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {/* small rotate/refresh icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-90"
          >
            <path
              d="M20 12a8 8 0 1 1-2.34-5.66"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 4v6h-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Change Job Reference
        </span>
      </button>

      {/* Right: Sort dropdown pill */}
      {/* Right: Top matched pill (Figma exact) */}
<button
  type="button"
  className="
    w-[162px] h-[40px]
    inline-flex items-center gap-[10px]
    rounded-[31px]
    border border-slate-200
    bg-white
    px-[18px] py-[8px]
    text-sm font-medium text-slate-700
    shadow-sm
  "
>
  {/* LeftIcon = true */}
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="text-slate-700"
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>

  <span>Top matched</span>
</button>

    </div>
  );
}
