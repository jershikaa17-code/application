"use client";

import { useSearchParams } from "next/navigation";
import CareerApplicationForm from "./CareerApplicationForm";

export default function CareersFormParams() {
  const params = useSearchParams();

  return (
    <CareerApplicationForm
      jobType={params.get("job_type") ?? undefined}
      jobId={params.get("job_title") ?? undefined}
      designation={params.get("designation") ?? undefined}
    />
  );
}
