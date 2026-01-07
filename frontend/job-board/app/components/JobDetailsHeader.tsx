"use client";

import Image from "next/image";
import {
    MapPin,
    Wifi,
    Clock3,
    Globe,
    Briefcase,
    Monitor,
    BarChart3,
} from "lucide-react";
import type { Job } from "@/app/types/jobs";

export default function JobDetailsHeader({ job }: { job: Job }) {
    return (
        <div className="w-full">
            {/* ✅ BOX 1 (height 127, py 12, gap 24) */}
            {/* ✅ BOX 1 */}
            <div className="flex items-start justify-between px-6 py-3">
                {/* LEFT SIDE (logo + text) */}
                <div className="flex items-start gap-6">
                    {/* Logo */}
                    <div className="mt-1 flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full bg-white">
                        <Image
                            src="/assets/brand/google-logo-icon-illustration-free-vector.jpg"
                            alt="Company logo"
                            width={90}
                            height={90}
                            className="h-[90px] w-[90px] object-cover"
                            priority
                        />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                        <div className="inline-flex rounded-full bg-[#EEE9FF] px-4 py-2 text-sm font-medium text-slate-700">
                            {job.postedAgo ?? "2 hours ago"}
                        </div>

                        <h1 className="mt-2 text-[28px] font-extrabold leading-tight text-slate-900">
                            {job.title}
                        </h1>

                        <div className="mt-1 text-[16px] font-semibold text-slate-400">
                            {job.company}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                {job.location}
                            </span>

                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

                            <span className="inline-flex items-center gap-2">
                                <Clock3 className="h-4 w-4 text-slate-500" />
                                3 days ago
                            </span>

                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

                            <span className="inline-flex items-center gap-2">
                                <Wifi className="h-4 w-4 text-slate-500" />
                                {job.workType}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE ring */}
                <div className="ml-6 shrink-0">
                    <MatchRing percent={job.matchPercent ?? 0} />
                </div>
            </div>


            {/* ✅ Divider */}
            <div className="h-px w-full bg-slate-200" />

            {/* ✅ BOX 2 (height 79, py 12, gap 38) */}
            <div className="px-6 py-3">
                <div className="grid grid-cols-3 gap-x-[38px] gap-y-4 text-[15px] text-slate-500">
                    <InfoItem icon={Globe} text="United States" />
                    <InfoItem icon={Briefcase} text="Internship" />
                    <InfoItem icon={Monitor} text="Remote" />

                    <InfoItem icon={Clock3} text="5+ years exp" />
                    <InfoItem icon={BarChart3} text="$90K/yr - $130K/yr" />
                    <InfoItem icon={Wifi} text="Mid Level" />
                </div>
            </div>

            {/* ✅ Divider */}
            <div className="h-px w-full bg-slate-200" />

            {/* ✅ BOX 3 (height 98, py 12, border bottom) */}
            <div className="px-6 py-3">
                <p className="line-clamp-2 text-sm leading-7 text-slate-700">
                    {job.description ?? "Job description..."}
                </p>
            </div>

            
        </div>
    );
}


function InfoItem({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-slate-400" />
            <span className="truncate">{text}</span>
        </div>
    );
}

function MatchRing({ percent }: { percent: number }) {
    const r = 34;
    const c = 2 * Math.PI * r;
    const offset = c - (percent / 100) * c;

    return (
        <div className="relative flex h-[92px] w-[92px] items-center justify-center">
            <svg className="h-[92px] w-[92px] -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="#A3E635"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                />
            </svg>

            <div className="absolute text-center">
                <div className="text-[18px] font-extrabold text-slate-900">{percent}%</div>
                <div className="text-[14px] text-slate-700">Match</div>
            </div>
        </div>
    );
}
