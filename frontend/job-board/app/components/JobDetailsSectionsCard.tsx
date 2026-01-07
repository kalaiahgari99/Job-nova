"use client";

type Props = {
  qualificationText: string;
  skills: string[];
  required: string[];
  preferred: string[];
  responsibilities: string[];
  benefits: string[];
  companyAbout: string;
};

export default function JobDetailsSectionsCard({
  qualificationText,
  skills,
  required,
  preferred,
  responsibilities,
  benefits,
  companyAbout,
}: Props) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Qualification */}
      <h2 className="text-[20px] font-extrabold text-slate-900">Qualification</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{qualificationText}</p>

      {/* Skills chips */}
      <div className="mt-4 flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <span
            key={i}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
          >
            {s}
          </span>
        ))}
      </div>

      <Divider />

      {/* Required */}
      <Section title="Required" items={required} />

      {/* Preferred */}
      <Section title="Preferred" items={preferred} />

      <Divider />

      {/* Responsibilities */}
      <Section title="Responsibilities" items={responsibilities} />

      <Divider />

      {/* Benefits */}
      <Section title="Benefits" items={benefits} />

      <Divider />

      {/* Company */}
      <h3 className="text-[18px] font-extrabold text-slate-900">Company</h3>
      <p className="mt-3 text-sm leading-7 text-slate-700">{companyAbout}</p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h3 className="text-[18px] font-extrabold text-slate-900">{title}</h3>
      <ul className="mt-3 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
        {items.map((t, idx) => (
          <li key={idx}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-slate-200" />;
}
