import { jobs } from "../data/jobs";

// You can later replace this with real API fetch if needed
export async function getTopMatchedJobs() {
  // simulate async
  return Promise.resolve(jobs);
}
