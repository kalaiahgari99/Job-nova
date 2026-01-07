// "use client";

// import { useState } from "react";

// import Sidebar from "@/app/components/Sidebar";
// import RightPanel from "@/app/components/RightPanel";
// import StatusTabs from "@/app/components/StatusTabs";
// import JobToolbar from "@/app/components/JobToolbar";
// import Modal from "@/app/components/Modal";
// import LiveKitPanel from "@/app/components/LiveKitPanel";
// import MobileSidebar from "@/app/components/MobileSidebar";
// import Dashboard from "@/app/pages/Dashboard";

// export default function Home() {
//   const [open, setOpen] = useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-slate-50">
//       <div className="mx-auto w-full max-w-[1400px] px-3 py-3 md:px-6 md:py-6">
//         <div className="flex gap-4">
//           {/* Desktop sidebar */}
//           <aside className="hidden md:block md:w-[260px] shrink-0">
//             <Sidebar />
//           </aside>

//           {/* Main area */}
//           <main className="flex-1 min-w-0">
//             {/* Mobile top bar */}
//             <div className="sticky top-0 z-10 mb-3 flex items-center gap-2 bg-slate-50/80 backdrop-blur md:hidden">
//               <button
//                 onClick={() => setMobileNavOpen(true)}
//                 className="rounded-lg border bg-white px-3 py-2 text-sm"
//               >
//                 ☰
//               </button>
//               <div className="font-semibold">JobNova</div>
//             </div>

//             {/* Mobile drawer sidebar */}
//             <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
//               <Sidebar />
//             </MobileSidebar>

//             {/* Tabs */}
//             <StatusTabs />

//             {/* ✅ Figma desktop widths */}
//             <div className="mt-4 grid grid-cols-1 items-start gap-6 md:grid-cols-[870px_290px]">
//               {/* ✅ CENTER PANEL (Figma-style container) */}
//               <section className="min-w-0">
//                 <div className="rounded-[12px] bg-white/60 border border-slate-200 p-4">
//                   {/* header row inside center panel */}
//                   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                     <JobToolbar />

//                     <button
//                       onClick={() => setOpen(true)}
//                       className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
//                     >
//                       Start Live Interview
//                     </button>
//                   </div>

//                   {/* job list scroll area */}
//                   <div className="mt-4 md:h-[739px] md:overflow-auto">
//                     <Dashboard />
//                   </div>
//                 </div>
//               </section>

//               {/* ✅ RIGHT */}
//               <aside className="min-w-0">
//                 {/* Desktop */}
//                 <div className="hidden md:block">
//                   <RightPanel />
//                 </div>

//                 {/* Mobile collapsible */}
//                 <details className="md:hidden rounded-xl border border-slate-200 bg-white">
//                   <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900">
//                     AI Mock Interview Panel
//                     <span className="text-slate-500">▾</span>
//                   </summary>
//                   <div className="px-3 pb-3">
//                     <RightPanel />
//                   </div>
//                 </details>
//               </aside>
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal open={open} title="Live Interview" onClose={() => setOpen(false)}>
//         <div className="mb-4 text-sm text-slate-600">
//           Real-time LiveKit session (mic + camera). Open a second tab to join.
//         </div>

//         <LiveKitPanel defaultRoom="demo-room" />

//         <div className="my-6 border-t border-slate-200" />

//         <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
//           <h3 className="mb-1 text-sm font-semibold text-slate-800">
//             Digital Human (Tavus Persona)
//           </h3>

//           <p className="mb-3 text-sm text-slate-600">
//             This section is reserved for real-time 2D/3D AI avatar rendering using the
//             Tavus Persona API (text input → avatar speaking with lip-sync).
//           </p>

//           <button
//             disabled
//             className="cursor-not-allowed rounded-lg bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
//           >
//             Start AI Avatar (Replica required)
//           </button>

//           <p className="mt-3 text-xs text-slate-500">
//             Note: Tavus requires a valid <code>replica_id</code> to stream a real-time
//             avatar. Replica creation is gated behind a paid plan. The backend integration
//             is implemented and verified; this feature can be enabled immediately once a
//             test <code>replica_id</code> is provided.
//           </p>
//         </div>
//       </Modal>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import RightPanel from "@/app/components/RightPanel";
import MobileSidebar from "@/app/components/MobileSidebar";

import JobDetailsBigCard from "@/app/components/JobDetailsBigCard"; // you have this
import { getTopMatchedJobs } from "@/app/services/jobService";

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => String(params?.id ?? ""), [params]);

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const jobs = await getTopMatchedJobs();
        const found = jobs.find((j: any) => String(j.id) === id);
        setJob(found ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (!id) return <div className="p-6">Missing job id</div>;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F7FB]">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-3 md:px-6 md:py-6">
        <div className="flex gap-6">
          {/* LEFT: Sidebar (desktop) */}
          <aside className="hidden md:block w-[219px] shrink-0">
            <Sidebar />
          </aside>

          {/* RIGHT: Main */}
          <main className="flex-1 min-w-0">
            {/* Mobile top bar */}
            <div className="sticky top-0 z-20 mb-3 flex items-center gap-2 bg-[#F7F7FB]/90 backdrop-blur md:hidden">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              >
                ☰
              </button>
              <button
                onClick={() => router.back()}
                className="ml-auto rounded-lg border bg-white px-3 py-2 text-sm"
              >
                ← Back
              </button>
            </div>

            {/* Mobile drawer sidebar */}
            <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
              <Sidebar />
            </MobileSidebar>

            {/* Layout: 870 + 290 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[870px_290px] items-start">
              <section className="min-w-0">
                {loading ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6">
                    Loading job {id}...
                  </div>
                ) : !job ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6">
                    Job not found for ID: {id}
                  </div>
                ) : (
                  <JobDetailsBigCard
                    job={job}
                    qualificationText={job.qualificationText ?? ""}
                    skills={job.skills ?? []}
                  />
                )}
              </section>

              <aside className="min-w-0">
                <div className="hidden md:block">
                  <RightPanel />
                </div>

                <details className="md:hidden rounded-xl border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900">
                    AI Mock Interview Panel
                    <span className="text-slate-500">▾</span>
                  </summary>
                  <div className="px-3 pb-3">
                    <RightPanel />
                  </div>
                </details>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


