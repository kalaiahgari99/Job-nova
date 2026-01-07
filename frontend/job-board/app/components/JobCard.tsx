"use client";
import { useState } from "react";
import { Link2 } from "lucide-react";
import Link from "next/link";






// inside JobCard component:


type Job = {
  id: number | string;
  matchPercent: number;
  title: string;
  company: string;
  location: string;
  workType: string; // "On-site"
  tags: string[]; // 4 chips
  postedAgo: string;
  applicants: string;
  liked?: boolean;
  
};

function ringColor(p: number) {
  // screenshot: yellow/orange for 64, green for high
  if (p >= 85) return "#A3E635"; // lime
  return "#FBBF24"; // amber
}

export default function JobCard({ job }: { job: Job }) {
  const [liked, setLiked] = useState(!!job.liked);
  const pct = Math.max(0, Math.min(100, job.matchPercent));
  const color = ringColor(pct);

  const size = 72;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <Link href={`/jobs/${job.id}`} className="block">
    <article className=" w-[870px]
    rounded-[12px]
    border border-slate-200
    bg-white
    shadow-sm
    transition-all duration-200 ease-out
    hover:shadow-md
    hover:-translate-y-[1px]">
      <div className="flex gap-5 p-6">
        {/* Match ring */}
        <div className="shrink-0">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="#EEF2F7"
                strokeWidth={stroke}
                fill="none"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <div className="text-xl font-extrabold text-slate-900">
                {pct}%
              </div>
              <div className="mt-1 text-sm text-slate-700">Match</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-extrabold text-slate-900">
                {job.title}
              </h3>

              {/* Company */}
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 9h4M10 13h4M10 17h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="truncate">{job.company}</span>
              </div>

              {/* Location row */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="11"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  {job.location}
                </span>

                <span className="text-purple-500">•</span>

                <span className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.55a11 11 0 0 1 14 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.5 15.5a6 6 0 0 1 7 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 19h.01"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  {job.workType}
                </span>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4 pt-1">
              {/* Link icon */}
              {/* Link icon */}
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700"
                aria-label="Open job link"
              >
                <Link2 className="h-[18px] w-[18px]" />
              </button>



              {/* Heart */}
              <button
                onClick={() => setLiked((v) => !v)}
                className={liked ? "text-purple-500" : "text-slate-400 hover:text-slate-700"}
                aria-label="like"
              >
                {liked ? (
                  /* FILLED heart */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  /* OUTLINE heart */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>


            </div>
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-medium text-slate-700">
                {job.postedAgo}
              </span>
              <span>{job.applicants}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-300 bg-white px-8 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                Apply
              </button>
              <button className="rounded-full bg-lime-400 px-8 py-2.5 text-sm font-semibold text-slate-900 hover:opacity-90">
                Mock Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
}
