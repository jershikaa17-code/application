import type { Metadata } from "next";
import { Suspense } from "react";
import CareersFormParams from "@/components/CareersFormParams";

export const metadata: Metadata = {
  title: "Job Application Form | OpsMonsters",
};

export default function CareersFormPage() {
  return (
    <Suspense fallback={null}>
      <CareersFormParams />
    </Suspense>
  );
}
