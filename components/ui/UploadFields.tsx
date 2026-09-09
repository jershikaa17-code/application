"use client";

import { useEffect, useMemo, useRef } from "react";

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M12 15V4M12 4L7.5 8.5M12 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhotoUpload({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  error?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <label
      className={`relative flex h-40 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 text-primary hover:bg-orange-50 transition overflow-hidden ${
        error ? "border-red-500" : "border-orange-500"
      }`}
    >
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Applicant preview" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <UploadIcon />
          <span className="text-xs font-medium mt-1">Upload photo</span>
          <span className="mt-1 text-[10px] text-gray-500">JPG / PNG</span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

export function ResumeUpload({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  error?: boolean;
}) {
  return (
    <label
      className={`flex h-36 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-primary hover:bg-orange-50 transition text-center px-3 ${
        error ? "border-red-500" : "border-primary"
      }`}
    >
      <UploadIcon />
      {file ? (
        <span className="text-sm font-medium mt-1 break-all">{file.name}</span>
      ) : (
        <>
          <span className="text-sm font-medium mt-1">Browse File</span>
          <span className="mt-1 text-xs text-gray-500">PDF (max 5MB)</span>
        </>
      )}
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}
