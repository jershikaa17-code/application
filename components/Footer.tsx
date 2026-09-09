"use client";

import { useEffect, useState } from "react";

function Rule({ trackClassName }: { trackClassName?: string }) {
  return (
    <div className="flex w-full max-w-4xl items-center overflow-hidden my-3">
      <div className="w-8 md:w-12 h-0.5 bg-primary shrink-0" />
      <div className={trackClassName ?? "flex-1 h-px bg-black/30"} />
    </div>
  );
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative w-full bg-gray-100 px-5 md:px-10 lg:px-10 xl:px-30 py-16 text-neutral-700 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="flex w-full max-w-4xl items-center overflow-hidden">
            <div className="w-8 md:w-12 h-0.5 bg-primary shrink-0" />
            <div className="flex-1 h-px bg-black/30" />
          </div>
          <h2 className="w-full max-w-[400px] text-xl md:text-[24px] font-normal mt-7">
            OpsMonsters
          </h2>
          <h1 className="my-7 text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[6rem] font-bold leading-none">
            <span className="text-primary">Ops</span>
            <span className="text-[#797c81]">Monsters</span>
          </h1>
          <div className="flex gap-5 items-center overflow-hidden">
            <video
              className="w-20 h-11 object-cover rounded-4xl"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/footer_video.mp4" type="video/mp4" />
            </video>
            <p className="max-w-sm text-md leading-relaxed text-black/50">
              Operations × Intelligence × Design
            </p>
          </div>
          <p className="mt-10 text-md text-black/50">
            ©2026 OpsMonsters Software Consulting Pvt. Ltd. — All work, all rights.
          </p>
        </div>

        <div className="grid relative grid-cols-1 xl:grid-cols-2 gap-10">
          <div>
            <p className="font-semibold text-xs text-neutral-500">OFFLINE</p>
            <Rule />
            <p className="leading-6">
              <span className="text-lg font-semibold text-black/50">OpsMonsters</span>
              <br />
              <span className="text-md text-black/50">
                No. 544/1A 1B, Pollachi Main Road, Eachanari Coimbatore, Tamil Nadu - 641021
              </span>
            </p>
          </div>

          <div>
            <p className="font-semibold text-xs text-neutral-500">ONLINE</p>
            <Rule />
            <a href="mailto:consult@opsmonsters.com" className="text-primary font-medium text-base">
              consult@opsmonsters.com
            </a>
          </div>

          <div>
            <p className="font-semibold text-xs text-neutral-500">PHONE</p>
            <Rule trackClassName="w-50 sm:w-80 lg:w-50 xl:flex-1 h-px bg-black/30" />
            <p className="text-[1.5rem] sm:text-[2.5rem] lg:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[2rem] font-medium text-neutral-500">
              (+91) 99949 53873
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className={`absolute bottom-15 right-3 md:bottom-0 md:right-12 w-12 h-12 text-5xl text-primary flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:-translate-y-5 ${
              showTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
