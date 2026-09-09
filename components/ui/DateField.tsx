"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { underlineFieldBase, underlineWrapper } from "./FormControls";

const CustomInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void; error?: boolean }
>(({ value, onClick, error }, ref) => (
  <div className={underlineWrapper(error)}>
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        readOnly
        onClick={onClick}
        value={value ?? ""}
        placeholder="dd-mm-yyyy"
        className={`${underlineFieldBase} cursor-pointer`}
      />
      <button
        type="button"
        onClick={onClick}
        aria-label="Open calendar"
        className="text-gray-500 shrink-0"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
));
CustomInput.displayName = "DateCustomInput";

export function DateField({
  value,
  onChange,
  error,
}: {
  value: Date | null;
  onChange: (d: Date | null) => void;
  error?: boolean;
}) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd-MM-yyyy"
      maxDate={new Date()}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      customInput={<CustomInput error={error} />}
    />
  );
}
