// app/types/jobs.ts

export type Job = {
  id: number | string;
  matchPercent: number;
  title: string;
  company: string;
  location: string;
  workType: string;      // e.g. "On-site"
  tags: string[];        // chips
  postedAgo: string;
  applicants: string;
  liked?: boolean;
   description?: string;
};
