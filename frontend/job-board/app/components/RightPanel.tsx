"use client";

export default function RightPanel() {
  return (
    <aside className="w-full md:w-[290px] shrink-0 min-w-0">
      {/* ✅ Figma: panel aligns with cards (NOT pushed down 100px) */}
      <div className="md:sticky md:top-[16px]">
        <div className="md:h-[790px] overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
          {/* TOP */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-purple-100 px-7 py-7">
            <div className="mb-4 text-slate-900">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11l.7 2.4L22 14l-2.3.6L19 17l-.7-2.4L16 14l2.3-.6L19 11Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12l.7 2.4L8 15l-2.3.6L5 18l-.7-2.4L2 15l2.3-.6L5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-lg font-extrabold leading-snug text-slate-900">
              Ace Your Interviews with AI-Powered Mock Sessions!
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              Struggling with interview nerves or unsure how to prepare? Let our
              cutting-edge AI mock interviews help you shine!
            </p>

            <div className="my-6 h-px w-full bg-slate-300/70" />

            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-slate-900">
                Why Choose Our AI Mock Interviews?
              </h4>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l1 3.5L16.5 7 13 8l-1 3.5L11 8 7.5 7 11 5.5 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5 space-y-5 text-sm text-slate-800">
              <div>
                <p className="font-extrabold">Job-Specific Simulations:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  <li>
                    Practice with questions tailored to your target role,
                    ensuring relevance and preparation.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-extrabold">Actionable Feedback</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  <li>
                    Get detailed analysis of your responses and practical,
                    step-by-step improvement suggestions.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-extrabold">Boost Success Rates:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  <li>
                    Perfect your interview skills and increase your chances of
                    landing the job you want.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="bg-white px-7 pb-8 pt-6">
            <div className="flex justify-center">
              <button className="flex w-[260px] items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-95">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Mock Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
