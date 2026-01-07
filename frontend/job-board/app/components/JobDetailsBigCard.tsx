"use client";

import JobDetailsHeader from "@/app/components/JobDetailsHeader";
import InterviewPromo from "@/app/components/InterviewPromo";

type Props = {
  job: any;
  qualificationText: string;
  skills: string[];
};

export default function JobDetailsBigCard({ job, qualificationText, skills }: Props) {
  return (
    <div className="w-full rounded-[12px] border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* ✅ Header SHOULD NOT be wrapped with p-6 if header already has padding */}
      <JobDetailsHeader job={job} />

      <Divider />

      {/* ✅ Job description block (Figma spacing) */}
      <div className="px-6 py-4 text-sm leading-6 text-slate-700">
        {job.description ??
          "Attending meetings to discuss needs, goals, budgets and timelines..."}
      </div>

      <Divider />

      {/* ✅ Promo INSIDE same big card */}
      <div className="px-6 py-6">
        <InterviewPromo />
      </div>

      <Divider />

      {/* ✅ All requirements in same big card */}
      <div className="px-6 py-6">
        <h2 className="text-[20px] font-extrabold text-slate-900">Qualification</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{qualificationText}</p>

        {/* ✅ Chips */}
        <div className="mt-5 flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              {s}
            </span>
          ))}
        </div>

        <Section title="Required" items={job.required ?? []} />
        <Section title="Preferred" items={job.preferred ?? []} />

        <DividerInside />
        <Section title="Responsibilities" items={job.responsibilities ?? []} />

        <DividerInside />
        <Section title="Benefits" items={job.benefits ?? []} />

        <DividerInside />

        <h3 className="text-[18px] font-extrabold text-slate-900">Company</h3>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {job.companyAbout ?? "Add company section from Figma here."}
        </p>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-7">
      <h3 className="text-[18px] font-extrabold text-slate-900">{title}</h3>
      <ul className="mt-3 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
        {(items?.length ? items : ["Add items from Figma here."]).map((t, idx) => (
          <li key={idx}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-slate-200" />;
}

function DividerInside() {
  return <div className="my-7 h-px w-full bg-slate-200" />;
}
