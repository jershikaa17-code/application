"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FieldError,
  FieldLabel,
  SelectField,
  TextField,
  TextareaField,
  ToggleSwitch,
} from "./ui/FormControls";
import { PhotoUpload, ResumeUpload } from "./ui/UploadFields";
import { PhoneField } from "./ui/PhoneField";
import { DateField } from "./ui/DateField";

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const CURRENT_STATUS_OPTIONS = [
  "Actively Employed",
  "Serving Notice Period",
  "Immediate Joiner",
  "Not Employed",
  "Freelancer / Consultant",
];
const WORK_LOCATION_OPTIONS = [
  "Coimbatore",
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi NCR",
  "Remote",
];
const EDUCATION_OPTIONS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
];
const YES_NO_OPTIONS = ["Yes", "No"];

interface FormState {
  photo: File | null;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  gender: string;
  maritalStatus: string;
  dob: Date | null;
  currentCity: string;
  panNumber: string;
  hasTechnicalSkills: boolean;
  skills: string[];
  hasGlobalCertifications: boolean;
  certifications: string[];
  totalExperience: string;
  relevantExperience: string;
  currentCTC: string;
  currentStatus: string;
  preferredWorkLocation: string;
  education: string;
  validPassport: string;
  relocateOverseas: string;
  referredByEmployee: boolean;
  coverLetter: string;
  resume: File | null;
  ackPrivacy: boolean;
  whatsappConsent: boolean;
  dataRetention3yr: boolean;
}

const initialState: FormState = {
  photo: null,
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "IN",
  phone: "",
  gender: "",
  maritalStatus: "",
  dob: null,
  currentCity: "",
  panNumber: "",
  hasTechnicalSkills: false,
  skills: [],
  hasGlobalCertifications: false,
  certifications: [],
  totalExperience: "",
  relevantExperience: "",
  currentCTC: "",
  currentStatus: "",
  preferredWorkLocation: "",
  education: "",
  validPassport: "",
  relocateOverseas: "",
  referredByEmployee: false,
  coverLetter: "",
  resume: null,
  ackPrivacy: false,
  whatsappConsent: false,
  dataRetention3yr: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

function validate(s: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!s.photo) errors.photo = "Applicant photo is required.";
  if (!s.firstName.trim()) errors.firstName = "First name is required.";
  if (!s.lastName.trim()) errors.lastName = "Last name is required.";
  if (!s.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(s.email)) errors.email = "Enter a valid email address.";
  if (!s.phone.trim()) errors.phone = "Phone number is required.";
  else if (s.phone.length < 7) errors.phone = "Enter a valid phone number.";
  if (!s.gender) errors.gender = "Please select a gender.";
  if (!s.maritalStatus) errors.maritalStatus = "Please select a marital status.";
  if (!s.dob) errors.dob = "Date of birth is required.";
  if (!s.currentCity.trim()) errors.currentCity = "Current city is required.";
  if (!s.panNumber.trim()) errors.panNumber = "PAN number is required.";
  else if (!PAN_RE.test(s.panNumber.toUpperCase())) errors.panNumber = "Enter a valid PAN (e.g. ABCDE1234F).";
  if (!s.totalExperience.trim()) errors.totalExperience = "Total years of experience is required.";
  if (!s.relevantExperience.trim())
    errors.relevantExperience = "Relevant years of experience is required.";
  if (!s.currentCTC.trim()) errors.currentCTC = "Current CTC is required.";
  if (!s.currentStatus) errors.currentStatus = "Please select current status.";
  if (!s.preferredWorkLocation) errors.preferredWorkLocation = "Please select a preferred work location.";
  if (!s.education) errors.education = "Please select your education.";
  if (!s.coverLetter.trim()) errors.coverLetter = "Cover letter is required.";
  else if (s.coverLetter.length > 250) errors.coverLetter = "Cover letter must be 250 characters or fewer.";
  if (!s.resume) errors.resume = "Resume is required.";
  if (!s.ackPrivacy) errors.ackPrivacy = "You must acknowledge the Privacy Notice to continue.";
  return errors;
}

function JobMeta({
  jobType,
  jobId,
  designation,
}: {
  jobType?: string;
  jobId?: string;
  designation?: string;
}) {
  const parts = [
    designation && { label: "Role", value: designation },
    jobType && { label: "Type", value: jobType },
    jobId && { label: "Job ID", value: jobId },
  ].filter(Boolean) as { label: string; value: string }[];

  if (parts.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
      {parts.map((p) => (
        <span key={p.label}>
          <span className="text-gray-400">{p.label}:</span>{" "}
          <span className="font-medium text-gray-800">{p.value}</span>
        </span>
      ))}
    </div>
  );
}

function ChipList({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (index: number) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 text-primary text-xs font-medium px-3 py-1"
        >
          {item}
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label={`Remove ${item}`}
            className="hover:text-red-600"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

export default function CareerApplicationForm({
  jobType,
  jobId,
  designation,
}: {
  jobType?: string;
  jobId?: string;
  designation?: string;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function markTouched(key: string) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  function showError(key: string) {
    return (attemptedSubmit || touched[key]) && errors[key];
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (Object.keys(validate(form)).length > 0) {
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addSkill() {
    const v = skillInput.trim();
    if (v && !form.skills.includes(v)) set("skills", [...form.skills, v]);
    setSkillInput("");
  }

  function addCert() {
    const v = certInput.trim();
    if (v && !form.certifications.includes(v)) set("certifications", [...form.certifications, v]);
    setCertInput("");
  }

  if (submitted) {
    return (
      <section className="pt-15 md:pt-0">
        <div className="flex items-center justify-center p-5 md:p-40">
          <div className="flex flex-col items-center justify-center w-full max-w-2xl rounded-2xl border border-gray-200 px-8 py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-orange-50 text-primary flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Application submitted</h1>
            <p className="mt-3 text-sm text-gray-600 max-w-md">
              Thank you{form.firstName ? `, ${form.firstName}` : ""}. Your application
              {designation ? ` for ${designation}` : ""} has been received. Our team will reach out to
              you at {form.email || "the email you provided"} if you&apos;re shortlisted.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setTouched({});
                setAttemptedSubmit(false);
                setSubmitted(false);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Submit another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-15 md:pt-0">
      <div className="flex items-center justify-center p-5 md:p-40">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl rounded-2xl border border-gray-200 px-8 py-10">
          <form className="w-full" onSubmit={handleSubmit} noValidate>
            <fieldset className="w-full flex flex-col gap-5">
              <legend className="text-2xl md:text-4xl font-bold">Job Application Form</legend>
              <JobMeta jobType={jobType} jobId={jobId} designation={designation} />
              <hr className="border border-gray-200 w-full mt-5" />

              {/* Applicant photo */}
              <div
                className="rounded-lg border border-gray-300 p-5 shadow-sm mt-5"
                data-error={!!showError("photo")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-1">
                      Applicant Photo <sup className="text-primary">*</sup>
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please upload a recent passport-size photograph (JPG / PNG).
                    </p>
                    <FieldError message={showError("photo") || undefined} />
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <PhotoUpload
                      file={form.photo}
                      onChange={(f) => {
                        set("photo", f);
                        markTouched("photo");
                      }}
                      error={!!showError("photo")}
                    />
                  </div>
                </div>
              </div>

              {/* Name / email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div className="w-full" data-error={!!showError("firstName")}>
                  <FieldLabel required>First Name</FieldLabel>
                  <TextField
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    onBlur={() => markTouched("firstName")}
                    error={!!showError("firstName")}
                  />
                  <FieldError message={showError("firstName") || undefined} />
                </div>
                <div className="w-full" data-error={!!showError("lastName")}>
                  <FieldLabel required>Last Name</FieldLabel>
                  <TextField
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    onBlur={() => markTouched("lastName")}
                    error={!!showError("lastName")}
                  />
                  <FieldError message={showError("lastName") || undefined} />
                </div>
                <div className="w-full" data-error={!!showError("email")}>
                  <FieldLabel required>Email Address</FieldLabel>
                  <TextField
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => markTouched("email")}
                    error={!!showError("email")}
                  />
                  <FieldError message={showError("email") || undefined} />
                </div>
              </div>

              {/* Phone / gender / marital status row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div data-error={!!showError("phone")}>
                  <FieldLabel required>Phone Number</FieldLabel>
                  <PhoneField
                    countryCode={form.countryCode}
                    onCountryChange={(v) => set("countryCode", v)}
                    value={form.phone}
                    onChange={(v) => set("phone", v)}
                    error={!!showError("phone")}
                  />
                  <FieldError message={showError("phone") || undefined} />
                </div>
                <div data-error={!!showError("gender")}>
                  <FieldLabel required>Gender</FieldLabel>
                  <SelectField
                    value={form.gender}
                    onChange={(e) => {
                      set("gender", e.target.value);
                      markTouched("gender");
                    }}
                    error={!!showError("gender")}
                  >
                    <option value="">Select</option>
                    {GENDER_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError message={showError("gender") || undefined} />
                </div>
                <div data-error={!!showError("maritalStatus")}>
                  <FieldLabel required>Marital Status</FieldLabel>
                  <SelectField
                    value={form.maritalStatus}
                    onChange={(e) => {
                      set("maritalStatus", e.target.value);
                      markTouched("maritalStatus");
                    }}
                    error={!!showError("maritalStatus")}
                  >
                    <option value="">Select</option>
                    {MARITAL_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError message={showError("maritalStatus") || undefined} />
                </div>
              </div>

              {/* DOB / city / PAN row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div data-error={!!showError("dob")}>
                  <FieldLabel required>Date of Birth</FieldLabel>
                  <DateField
                    value={form.dob}
                    onChange={(d) => {
                      set("dob", d);
                      markTouched("dob");
                    }}
                    error={!!showError("dob")}
                  />
                  <FieldError message={showError("dob") || undefined} />
                </div>
                <div data-error={!!showError("currentCity")}>
                  <FieldLabel required>Current City</FieldLabel>
                  <TextField
                    placeholder="Enter current city"
                    value={form.currentCity}
                    onChange={(e) => set("currentCity", e.target.value)}
                    onBlur={() => markTouched("currentCity")}
                    error={!!showError("currentCity")}
                  />
                  <FieldError message={showError("currentCity") || undefined} />
                </div>
                <div data-error={!!showError("panNumber")}>
                  <FieldLabel required>PAN Number</FieldLabel>
                  <TextField
                    placeholder="ABCDE1234F"
                    value={form.panNumber}
                    maxLength={10}
                    onChange={(e) => set("panNumber", e.target.value.toUpperCase())}
                    onBlur={() => markTouched("panNumber")}
                    error={!!showError("panNumber")}
                  />
                  <FieldError message={showError("panNumber") || undefined} />
                </div>
              </div>

              {/* Skills / certifications toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div className="space-y-2">
                  <ToggleSwitch
                    label="Technical Skills"
                    checked={form.hasTechnicalSkills}
                    onChange={(v) => set("hasTechnicalSkills", v)}
                  />
                  {form.hasTechnicalSkills && (
                    <div className="pt-1">
                      <div className={"relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-300 after:transition-all focus-within:after:bg-orange-600"}>
                        <div className="flex items-center gap-2">
                          <input
                            className="w-full bg-transparent px-0 py-2 text-sm outline-none placeholder:text-gray-400"
                            placeholder="e.g. React, SQL"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={addSkill}
                            className="text-xs font-medium text-primary shrink-0 cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <ChipList
                        items={form.skills}
                        onRemove={(i) => set("skills", form.skills.filter((_, idx) => idx !== i))}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <ToggleSwitch
                    label="Global Certifications"
                    checked={form.hasGlobalCertifications}
                    onChange={(v) => set("hasGlobalCertifications", v)}
                  />
                  {form.hasGlobalCertifications && (
                    <div className="pt-1">
                      <div className={"relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-300 after:transition-all focus-within:after:bg-orange-600"}>
                        <div className="flex items-center gap-2">
                          <input
                            className="w-full bg-transparent px-0 py-2 text-sm outline-none placeholder:text-gray-400"
                            placeholder="e.g. AWS Certified"
                            value={certInput}
                            onChange={(e) => setCertInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addCert();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={addCert}
                            className="text-xs font-medium text-primary shrink-0 cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <ChipList
                        items={form.certifications}
                        onRemove={(i) =>
                          set(
                            "certifications",
                            form.certifications.filter((_, idx) => idx !== i)
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Experience / CTC row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div data-error={!!showError("totalExperience")}>
                  <FieldLabel required>Total years of Experience</FieldLabel>
                  <TextField
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="Enter total years of experience"
                    value={form.totalExperience}
                    onChange={(e) => set("totalExperience", e.target.value)}
                    onBlur={() => markTouched("totalExperience")}
                    error={!!showError("totalExperience")}
                  />
                  <FieldError message={showError("totalExperience") || undefined} />
                </div>
                <div data-error={!!showError("relevantExperience")}>
                  <FieldLabel required>Total Years of Relevant Experience</FieldLabel>
                  <TextField
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="Enter total years of relevant experience"
                    value={form.relevantExperience}
                    onChange={(e) => set("relevantExperience", e.target.value)}
                    onBlur={() => markTouched("relevantExperience")}
                    error={!!showError("relevantExperience")}
                  />
                  <FieldError message={showError("relevantExperience") || undefined} />
                </div>
                <div data-error={!!showError("currentCTC")}>
                  <FieldLabel required>Current CTC (LPA)</FieldLabel>
                  <TextField
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="Enter current CTC in LPA"
                    value={form.currentCTC}
                    onChange={(e) => set("currentCTC", e.target.value)}
                    onBlur={() => markTouched("currentCTC")}
                    error={!!showError("currentCTC")}
                  />
                  <FieldError message={showError("currentCTC") || undefined} />
                </div>
              </div>

              {/* Status / location / education row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div data-error={!!showError("currentStatus")}>
                  <FieldLabel required>Current Status</FieldLabel>
                  <SelectField
                    value={form.currentStatus}
                    onChange={(e) => {
                      set("currentStatus", e.target.value);
                      markTouched("currentStatus");
                    }}
                    error={!!showError("currentStatus")}
                  >
                    <option value="">Select</option>
                    {CURRENT_STATUS_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError message={showError("currentStatus") || undefined} />
                </div>
                <div data-error={!!showError("preferredWorkLocation")}>
                  <FieldLabel required>Preferred Work Location</FieldLabel>
                  <SelectField
                    value={form.preferredWorkLocation}
                    onChange={(e) => {
                      set("preferredWorkLocation", e.target.value);
                      markTouched("preferredWorkLocation");
                    }}
                    error={!!showError("preferredWorkLocation")}
                  >
                    <option value="">Select</option>
                    {WORK_LOCATION_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError message={showError("preferredWorkLocation") || undefined} />
                </div>
                <div data-error={!!showError("education")}>
                  <FieldLabel required>Education</FieldLabel>
                  <SelectField
                    value={form.education}
                    onChange={(e) => {
                      set("education", e.target.value);
                      markTouched("education");
                    }}
                    error={!!showError("education")}
                  >
                    <option value="">Select</option>
                    {EDUCATION_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError message={showError("education") || undefined} />
                </div>
              </div>

              {/* Passport / relocate row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <div>
                  <FieldLabel>Do you have a Valid Passport</FieldLabel>
                  <SelectField
                    value={form.validPassport}
                    onChange={(e) => set("validPassport", e.target.value)}
                  >
                    <option value="">Select</option>
                    {YES_NO_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <div>
                  <FieldLabel>Willing to relocate overseas?</FieldLabel>
                  <SelectField
                    value={form.relocateOverseas}
                    onChange={(e) => set("relocateOverseas", e.target.value)}
                  >
                    <option value="">Select</option>
                    {YES_NO_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </div>

              {/* Referred */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                <ToggleSwitch
                  label="Have you been referred by our employee?"
                  checked={form.referredByEmployee}
                  onChange={(v) => set("referredByEmployee", v)}
                />
              </div>

              {/* Cover letter */}
              <div className="mt-5" data-error={!!showError("coverLetter")}>
                <FieldLabel required>Cover Letter (If any)</FieldLabel>
                <TextareaField
                  rows={3}
                  maxLength={250}
                  placeholder="Leave us a message (max 250 characters)"
                  value={form.coverLetter}
                  onChange={(e) => set("coverLetter", e.target.value)}
                  onBlur={() => markTouched("coverLetter")}
                  error={!!showError("coverLetter")}
                />
                <div className="flex justify-between">
                  <FieldError message={showError("coverLetter") || undefined} />
                  <span className="mt-1 text-xs text-gray-400">{form.coverLetter.length}/250</span>
                </div>
              </div>

              <hr className="border border-gray-200 w-full" />

              {/* Resume upload */}
              <div
                className="rounded-lg border border-gray-300 p-5 shadow-sm"
                data-error={!!showError("resume")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      Upload Resume <sup className="text-primary">*</sup>
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Please upload resume to extract and autofill application.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>File size should not exceed 5 MB.</li>
                      <li>Ensure the resume is up to date with skills and work history dates.</li>
                      <li>Use .pdf file for your resume.</li>
                    </ul>
                    <FieldError message={showError("resume") || undefined} />
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <ResumeUpload
                      file={form.resume}
                      onChange={(f) => {
                        set("resume", f);
                        markTouched("resume");
                      }}
                      error={!!showError("resume")}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Privacy and Data Protection
                </h3>
                <div className="h-90 md:h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-700">
                  <div className="ql-editor read-mode">
                    <PrivacyNotice />
                  </div>
                </div>

                <div className="mt-4 space-y-3 px-2">
                  <label className="flex items-center gap-3 text-[10px] md:text-sm text-gray-700 leading-relaxed">
                    <input
                      type="checkbox"
                      className="h-3 md:h-4 w-3 md:w-4 shrink-0 accent-orange-600"
                      checked={form.ackPrivacy}
                      onChange={(e) => {
                        set("ackPrivacy", e.target.checked);
                        markTouched("ackPrivacy");
                      }}
                    />
                    <span>
                      By checking the box, you acknowledge that you have read and understood the terms
                      of the Privacy Notice
                    </span>
                  </label>
                  <FieldError message={showError("ackPrivacy") || undefined} />

                  <label className="flex items-center gap-3 text-[10px] md:text-sm text-gray-700 leading-relaxed">
                    <input
                      type="checkbox"
                      className="h-3 md:h-4 w-3 md:w-4 shrink-0 accent-orange-600"
                      checked={form.whatsappConsent}
                      onChange={(e) => set("whatsappConsent", e.target.checked)}
                    />
                    <span>
                      I acknowledge that OpsMonsters Software Consultancy Private Limited would be
                      processing my personal data to communicate with me, engage and provide status of
                      my job application, through WhatsApp messages. My personal data would be
                      processed as per the Privacy Notice. I am aware that this service is optional and
                      I can register/deregister at any stage.
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-[10px] md:text-sm text-gray-700 leading-relaxed">
                    <input
                      type="checkbox"
                      className="h-3 md:h-4 w-3 md:w-4 shrink-0 accent-orange-600"
                      checked={form.dataRetention3yr}
                      onChange={(e) => set("dataRetention3yr", e.target.checked)}
                    />
                    <span>
                      I agree to storing of my personal data by OpsMonsters Software Consultancy
                      Private Limited for a period of 3 years for any future reference, in case not
                      shortlisted or I do not join the organization.
                    </span>
                  </label>
                  <label className="flex items-center gap-3 text-[10px] md:text-sm text-gray-500 leading-relaxed italic px-6">
                    <span>
                      (Not checking this box will mean that your personal data will be retained for a
                      period of 14 months before deletion.)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm text-white bg-[#fa4403] hover:bg-[#fa4403]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

function PrivacyNotice() {
  return (
    <>
      <h2 className="text-lg font-bold mt-0 mb-2">OpsMonsters Software Consulting Private Limited</h2>
      <h3 className="text-sm font-semibold mt-3 mb-1">1. For OpsMonsters Limited Candidates</h3>
      <p className="mb-2">Version 1.0</p>
      <p className="mb-2">
        OpsMonsters Software Consulting Private Limited, its subsidiaries, associates, and affiliated
        companies (collectively referred to as &ldquo;OpsMonsters Software Consulting Private
        Limited&rdquo;, &ldquo;us&rdquo;, &ldquo;we&rdquo;) are committed to process your personal data
        as per the laws of your jurisdiction. We hereby notify you the following information about your
        personal data processing:
      </p>
      <h3 className="text-sm font-semibold mt-3 mb-1">Personal Data elements collected/processed</h3>
      <p className="mb-2">
        We collect your personal data such as valid ID proof, Educational Details, PAN, Photograph,
        Resume, Date of Birth, Gaps in education, Gaps in Work Experience, Whether an Ex OpsMonsters,
        Whether under any legal obligation by the current employer, Work Experience, Current
        Compensation letter/Salary Slip (past 3 months), Current Compensation, Current Location, Salary
        expectation at OpsMonsters Software Consulting Private Limited, Next revision expected, Whether
        currently employed with any of the OpsMonsters Group Companies, Alternative Phone number, Name,
        Email ID, Phone Number, Address, Gender, Whether having passport, Citizenship, and related
        recruitment assessment data.
      </p>
      <h3 className="text-sm font-semibold mt-3 mb-1">Purpose of Collection</h3>
      <p className="mb-1">We process your personal data for:</p>
      <ul className="list-disc pl-5 mb-2 space-y-0.5">
        <li>Recruitment and candidate identification</li>
        <li>Selection, internship &amp; onboarding processes</li>
        <li>Leadership reporting</li>
        <li>AI/ML model training</li>
        <li>IVR calls for interview scheduling</li>
        <li>Fraud &amp; impersonation prevention</li>
        <li>Online proctored assessments</li>
        <li>Background verification</li>
        <li>Legal compliance</li>
        <li>Job recommendations</li>
      </ul>
      <h3 className="text-sm font-semibold mt-3 mb-1">Data Recipients</h3>
      <p className="mb-2">
        Authorized recipients within OpsMonsters Software Consulting Private Limited, subsidiaries, HR,
        Recruitment, Finance, Facilities, Immigration, leadership, vendors, auditors, clients (where
        applicable), and authorities.
      </p>
      <h3 className="text-sm font-semibold mt-3 mb-1">Data Storage &amp; Security</h3>
      <p className="mb-2">
        Stored on OpsMonsters Software Consulting Private Limited servers in India and authorized cloud
        service providers in India, protected by administrative, physical, and technical security
        controls.
      </p>
      <h3 className="text-sm font-semibold mt-3 mb-1">Your Rights</h3>
      <p className="mb-2">You may exercise your data privacy rights by emailing privacy@opsmonsters.com</p>
      <h3 className="text-sm font-semibold mt-3 mb-1">Contact &ndash; Data Privacy Officer</h3>
      <p className="mb-2">
        AJAY KRISHNA, Data Privacy Office, OpsMonsters Software Consulting Private Limited, Eachanari
        Coimbatore. Phone: (+91) 99949 53873. Effective Date: 5th Dec 2025.
      </p>
      <p className="mb-2 italic">
        By clicking the button below, you confirm reading and consent to OpsMonsters Software
        Consulting Private Limited processing your personal data.
      </p>
      <h2 className="text-lg font-bold mt-4 mb-2">
        2. For OpsMonsters Software Consulting Private Limited Candidates
      </h2>
      <p className="mb-2">
        OpsMonsters Software Consulting Private Limited, its parent company, and its subsidiaries and
        affiliates (collectively &ldquo;OpsMonsters&rdquo;) process personal data in accordance with
        applicable laws, including Name, Resume, Photograph, Gender, PAN, DOB, Mobile, Email,
        Citizenship, Passport, Address, Education, Employment history, Compensation, Skills, ID proof,
        Proctoring images and background verification data.
      </p>
      <p className="mb-2 italic">
        By checking the box, you acknowledge that you have read and understood the terms of the Privacy
        Notice.
      </p>
    </>
  );
}
