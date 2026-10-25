import { Info, GraduationCap, User, Hash, Building2, BookText, Target } from "lucide-react";

const INFO = [
  { label: "Project Title", value: "Digital Library Management System", icon: BookText },
  { label: "Subject", value: "Node.js Lab", icon: Info },
  { label: "Academic Year", value: "2026 – 2027", icon: Info },
  { label: "Student Name", value: "A. Akshara Sindhu", icon: User },
  { label: "Roll Number", value: "257R1A6605", icon: Hash },
  { label: "Department", value: "CSE – Artificial Intelligence and Machine Learning", icon: GraduationCap },
  { label: "College", value: "CMR Technical Campus", icon: Building2 },
];

export default function AboutView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative">
          <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <BookText className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Digital Library Management System</h3>
          <p className="mt-2 text-sm text-blue-100/90 max-w-2xl">
            A college mini-project that simplifies book management, searching, and availability tracking through a clean digital interface.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="text-base font-semibold text-slate-800">Project Details</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-6">
          {INFO.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{row.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-indigo-600" />
          <h4 className="text-base font-semibold text-slate-800">Project Purpose</h4>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The project's purpose is to simplify book management, searching, and availability tracking through a digital interface.
          Librarians can add new books, search across titles, authors and categories, filter by availability, issue books to readers,
          and process returns — all from a single responsive dashboard. Book records persist in the browser's localStorage, so the
          collection is preserved between sessions on the same device.
        </p>
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> localStorage stores data only in the current browser and is not shared across devices.
          </p>
        </div>
      </div>
    </div>
  );
}
