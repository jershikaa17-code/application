import type { Metadata } from "next";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Job Application Form | OpsMonsters",
};

function firstValue(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function CareersFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const jobType = firstValue(params.job_type);
  const jobId = firstValue(params.job_title);
  const designation = firstValue(params.designation);

  return <CareerApplicationForm jobType={jobType} jobId={jobId} designation={designation} />;
}
