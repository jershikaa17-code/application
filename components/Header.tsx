"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = ["About", "Services", "Careers", "Blogs"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-30 backdrop-blur-xl bg-white/70 border-b border-black/10">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 h-16 sm:h-18">
        <Link href="/" className="flex items-center shrink-0 pr-20 border-none gap-2">
          <Image src="/logo.png" alt="OpsMonsters" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" priority />
          <span className="flex items-baseline text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
            <span className="text-primary">Ops</span>
            <span className="text-[#797c81]">Monsters</span>
          </span>
        </Link>

        <nav className="hidden z-50 w-full lg:flex items-center justify-between gap-10 uppercase tracking-wide transition-colors duration-300 text-black text-sm">
          <div className="flex gap-10">
            {NAV_LINKS.map((label) => (
              <a key={label} href="#" className="hover:text-primary transition-colors">
                {label}
              </a>
            ))}
          </div>
          <a href="#" className="transition-colors hover:text-primary">
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden flex items-center justify-center w-9 h-9 text-black"
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 border-t border-black/10 px-6 py-4 flex flex-col gap-4 uppercase tracking-wide text-sm">
          {[...NAV_LINKS, "Contact"].map((label) => (
            <a key={label} href="#" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
