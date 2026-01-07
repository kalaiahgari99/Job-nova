// "use client";

// import Image from "next/image";
// import { Briefcase, Sparkles, FileText, User, Settings, BadgeCheck, CircleDollarSign } from "lucide-react";

// const navTop = [
//   { label: "Jobs", icon: Briefcase, href: "/jobs", active: true },
//   { label: "AI Mock Interview", icon: Sparkles, href: "/mock" },
//   { label: "Resume", icon: FileText, href: "/resume" },
// ];

// const navMid = [
//   { label: "Profile", icon: User, href: "/profile" },
//   { label: "Setting", icon: Settings, href: "/settings" },
// ];

// const navBottom = [
//   { label: "Subscription", icon: BadgeCheck, href: "/subscription" },
//   { label: "Extra Credits", icon: CircleDollarSign, href: "/credits" },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="w-[219px] h-[900px] shrink-0 bg-white px-4 py-6 border-r">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3">
//         <Image
//           src="/assets/brand/logo.png"
//           alt="JobNova"
//           width={140}
//           height={40}
//           priority
//           className="h-auto w-auto"
//         />
//       </div>

//       {/* Nav */}
//       <nav className="space-y-2">
//         {navTop.map((item) => (
//           <NavItem key={item.label} {...item} />
//         ))}

//         <Divider />

//         {navMid.map((item) => (
//           <NavItem key={item.label} {...item} />
//         ))}

//         <Divider />

//         {navBottom.map((item) => (
//           <NavItem key={item.label} {...item} />
//         ))}
//       </nav>

//       {/* Upgrade Card */}
//       <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#c4b5fd] p-5 text-white">
//         <div className="text-lg font-semibold">Upgrade Your Plan</div>
//         <div className="mt-2 text-sm text-white/90">Boost your success rate now!</div>

//         <button className="mt-4 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
//           Subscription
//         </button>
//       </div>
//     </aside>
//   );
// }

// function Divider() {
//   return <div className="my-4 h-px w-full bg-slate-200" />;
// }

// function NavItem({
//   label,
//   icon: Icon,
//   href,
//   active,
// }: {
//   label: string;
//   icon: any;
//   href: string;
//   active?: boolean;
// }) {
//   return (
//     <a
//       href={href}
//       className={[
//         "flex items-center gap-3 rounded-full px-4 py-3 text-[15px] transition",
//         active ? "bg-[#a78bfa] text-white" : "text-slate-700 hover:bg-slate-100",
//       ].join(" ")}
//     >
//       <Icon size={18} />
//       <span>{label}</span>
//     </a>
//   );
// }

"use client";

import Image from "next/image";
import {
  Briefcase,
  Sparkles,
  FileText,
  User,
  Settings,
  BadgeCheck,
  CircleDollarSign,
} from "lucide-react";

const navTop = [
  { label: "Jobs", icon: Briefcase, href: "/jobs", active: true },
  { label: "AI Mock Interview", icon: Sparkles, href: "/mock" },
  { label: "Resume", icon: FileText, href: "/resume" },
];

const navMid = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Setting", icon: Settings, href: "/settings" },
];

const navBottom = [
  { label: "Subscription", icon: BadgeCheck, href: "/subscription" },
  { label: "Extra Credits", icon: CircleDollarSign, href: "/credits" },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-[219px] md:h-[900px] shrink-0 bg-white px-4 py-6 border-r overflow-y-auto md:overflow-visible">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <Image
          src="/assets/brand/logo.png"
          alt="JobNova"
          width={140}
          height={40}
          priority
          className="h-auto w-auto"
        />
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        {navTop.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}

        <Divider />

        {navMid.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}

        <Divider />

        {navBottom.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Upgrade Card */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#c4b5fd] p-5 text-white">
        <div className="text-lg font-semibold">Upgrade Your Plan</div>
        <div className="mt-2 text-sm text-white/90">
          Boost your success rate now!
        </div>

        <button className="mt-4 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
          Subscription
        </button>
      </div>
    </aside>
  );
}

function Divider() {
  return <div className="my-4 h-px w-full bg-slate-200" />;
}

function NavItem({
  label,
  icon: Icon,
  href,
  active,
}: {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "flex items-center gap-3 rounded-full px-4 py-3 text-[15px] transition",
        active ? "bg-[#a78bfa] text-white" : "text-slate-700 hover:bg-slate-100",
      ].join(" ")}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );
}
