import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-32 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        <span className="text-primary">Ops</span>
        <span className="text-[#797c81]">Monsters</span>
      </h1>
      <p className="mt-4 max-w-md text-base text-gray-600">
        Operations × Intelligence × Design
      </p>
      <Link
        href="/careersForms?job_type=Full-Time&job_title=HR-OPN-2026-0730&designation=Data%20Engineer"
        className="mt-10 inline-flex items-center gap-2 rounded-md bg-[#fa4403] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#fa4403]/90 transition-colors"
      >
        View Career Application Form
      </Link>
    </div>
  );
}
