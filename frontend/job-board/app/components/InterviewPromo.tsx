"use client";

export default function InterviewPromo() {
  return (
    <div className="w-full rounded-[18px] bg-[#B7F233] p-8">
      {/* Header row */}
      <div className="flex items-start gap-5">
        {/* Robot icon */}
        <div className="mt-1 flex h-10 w-10 items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 3h6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 3v2"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="5"
              y="7"
              width="14"
              height="12"
              rx="4"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M9 12h.01M15 12h.01"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M8.5 16c1 .8 2.2 1.2 3.5 1.2S14.5 16.8 15.5 16"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title + subtitle */}
        <div className="flex-1">
          <h3 className="text-[22px] font-extrabold text-black">
            Maximize your interview success
          </h3>
          <p className="mt-2 max-w-[640px] text-[14px] leading-6 text-black/70">
            Our platform simulates real interview scenarios, helping you refine
            your responses and boost your confidence.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-black/15" />

      {/* 3 columns + button */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
        <div>
          <p className="text-[16px] font-extrabold text-black">
            Job-Specific Simulations:
          </p>
          <p className="mt-2 text-[14px] leading-6 text-black/70">
            Practice with questions tailored to your target role, ensuring
            relevance and preparation.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-extrabold text-black">
            Actionable Feedback
          </p>
          <p className="mt-2 text-[14px] leading-6 text-black/70">
            Get detailed analysis of your responses and practical, step-by-step
            improvement suggestions.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-extrabold text-black">
            Boost Success Rates:
          </p>
          <p className="mt-2 text-[14px] leading-6 text-black/70">
            Perfect your interview skills and increase your chances of landing
            the job you want.
          </p>
        </div>

        {/* Button aligned bottom-right like Figma */}
        <div className="flex items-end justify-start md:justify-end">
          <button className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:opacity-95">
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}
