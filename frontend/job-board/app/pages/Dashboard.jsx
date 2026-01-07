"use client";

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getTopMatchedJobs } from "../services/jobService";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getTopMatchedJobs().then(setJobs);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Top matched jobs</h2>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={job.id ?? index} job={job} />
        ))}
      </div>
    </div>
  );
}
