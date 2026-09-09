"use client";

import * as Flags from "country-flag-icons/react/3x2";
import { useEffect, useMemo, useRef, useState } from "react";
import { underlineFieldBase, underlineWrapper } from "./FormControls";

const COUNTRIES: { code: keyof typeof Flags; name: string; dial: string }[] = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "EG", name: "Egypt", dial: "+20" },
];

function FlagIcon({ code, className }: { code: keyof typeof Flags; className?: string }) {
  const Flag = Flags[code];
  const cls = className ?? "w-[18px] h-[13px]";
  if (!Flag) return <span className={`inline-block bg-gray-200 rounded-[2px] ${cls}`} />;
  return <Flag title={code} className={cls} />;
}

function CountryCodeSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => COUNTRIES.find((c) => c.code === value) ?? COUNTRIES[0],
    [value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    const raf = requestAnimationFrame(() => searchRef.current?.focus());
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <div className={underlineWrapper(error)}>
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setQuery("");
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="w-full flex items-center gap-2 bg-transparent px-0 py-3 text-sm outline-none cursor-pointer"
        >
          <span className="shrink-0 rounded-[2px] overflow-hidden ring-1 ring-black/10 leading-none">
            <FlagIcon code={selected.code} />
          </span>
          <span className="truncate text-gray-900">
            {selected.code} ({selected.dial})
          </span>
          <span className="ml-auto shrink-0 text-gray-500 text-xs">
            <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <div className="absolute z-40 mt-1 w-72 max-w-[85vw] rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-orange-400"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No countries found</li>
            )}
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.code === value}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-orange-50 transition-colors ${
                    c.code === value ? "bg-orange-50 text-primary font-medium" : "text-gray-700"
                  }`}
                >
                  <FlagIcon code={c.code} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-gray-500 shrink-0">{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PhoneField({
  countryCode,
  onCountryChange,
  value,
  onChange,
  error,
}: {
  countryCode: string;
  onCountryChange: (v: string) => void;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-6">
      <CountryCodeSelect value={countryCode} onChange={onCountryChange} error={error} />

      <div className={underlineWrapper(error)}>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Enter phone number"
          className={underlineFieldBase}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          maxLength={15}
        />
      </div>
    </div>
  );
}
