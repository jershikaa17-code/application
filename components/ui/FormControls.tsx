"use client";

import { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

export const underlineWrapper = (error?: boolean) =>
  `relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:transition-all after:content-[''] ${
    error ? "after:bg-red-500" : "after:bg-gray-300 focus-within:after:bg-orange-600"
  }`;

export const underlineFieldBase =
  "w-full bg-transparent px-0 py-3 text-sm outline-none placeholder:text-gray-400";

export function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1 block text-sm text-gray-700">
      {children}
      {required && <sup className="text-red-600 ml-0.5">*</sup>}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function DoubleChevron() {
  return (
    <div className="pointer-events-none text-gray-500 text-xs flex flex-col leading-none">
      <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 5l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function TextField({
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <div className={underlineWrapper(error)}>
      <input className={`${underlineFieldBase} ${className ?? ""}`} {...props} />
    </div>
  );
}

export function TextareaField({
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <div className={underlineWrapper(error)}>
      <textarea className={`${underlineFieldBase} resize-none ${className ?? ""}`} {...props} />
    </div>
  );
}

export function SelectField({
  error,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <div className={underlineWrapper(error)}>
      <div className="flex items-center border-b-0">
        <select
          className={`${underlineFieldBase} appearance-none cursor-pointer ${
            !props.value ? "text-gray-400" : "text-gray-900"
          } ${className ?? ""}`}
          {...props}
        >
          {children}
        </select>
        <DoubleChevron />
      </div>
    </div>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-700 gap-4">
      {label && <span>{label}</span>}
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`relative h-7 w-16 rounded-full transition-colors duration-300 ${
            checked ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute inset-0 flex items-center text-[11px] font-semibold pointer-events-none text-white ${
              checked ? "justify-start pl-2.5" : "justify-end pr-2.5 text-gray-600"
            }`}
          >
            {checked ? "Yes" : "No"}
          </span>
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
              checked ? "translate-x-9" : "translate-x-0"
            }`}
          />
        </span>
      </label>
    </div>
  );
}
