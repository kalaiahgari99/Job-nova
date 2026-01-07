"use client";

type Props = {
  qualificationText?: string;
  skills?: string[];
  required?: string[];
  preferred?: string[];
};

export default function JobRequirementsCard({
  qualificationText,
  skills = [],
  required = [],
  preferred = [],
}: Props) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Qualification */}
      <h3 className="text-[18px] font-extrabold text-slate-900">Qualification</h3>

      <p className="mt-3 text-[14px] leading-6 text-slate-700">
        {qualificationText ??
          "Discover how your skills align with the requirements of this position. Below is a detailed list of the essential skills needed for the role."}
      </p>

      {/* Skill chips */}
      <div className="mt-4 flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 px-4 py-2 text-[13px] text-slate-800"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Required */}
      <h4 className="mt-8 text-[16px] font-extrabold text-slate-900">Required</h4>
      <ul className="mt-3 list-disc space-y-3 pl-6 text-[14px] leading-6 text-slate-800">
        {required.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      {/* Preferred */}
      <h4 className="mt-10 text-[16px] font-extrabold text-slate-900">Preferred</h4>
      <ul className="mt-3 list-disc space-y-3 pl-6 text-[14px] leading-6 text-slate-800">
        {preferred.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
