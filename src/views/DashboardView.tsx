import { BookOpen, CheckCircle2, BookCheck, Tags, ArrowRight, Clock } from "lucide-react";
import type { Book } from "@/lib/types";
import type { ViewKey } from "@/components/Sidebar";

interface DashboardProps {
  stats: { total: number; available: number; issued: number; categories: number };
  recentBooks: Book[];
  onNavigate: (view: ViewKey) => void;
}

export default function DashboardView({ stats, recentBooks, onNavigate }: DashboardProps) {
  const cards = [
    { label: "Total Books", value: stats.total, icon: BookOpen, accent: "from-blue-500 to-blue-600" },
    { label: "Available Books", value: stats.available, icon: CheckCircle2, accent: "from-emerald-500 to-emerald-600" },
    { label: "Issued Books", value: stats.issued, icon: BookCheck, accent: "from-amber-500 to-orange-500" },
    { label: "Total Categories", value: stats.categories, icon: Tags, accent: "from-indigo-500 to-indigo-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-24 top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm text-blue-200 font-medium">Welcome back,</p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold">A. Akshara Sindhu</h3>
          <p className="mt-2 text-sm text-blue-100/90 max-w-xl">
            Manage your library collection, search books, and track issued titles from a single dashboard.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("add")}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:bg-blue-50 transition"
            >
              Add New Book
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("all")}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 border border-blue-300/30 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-500/30 transition"
            >
              Browse Collection
            </button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="group rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${c.accent} flex items-center justify-center shadow`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-800">{c.value.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recently added */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-800">Recently Added</h3>
          </div>
          <button
            onClick={() => onNavigate("all")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-5 sm:p-6">
          {recentBooks.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2">{b.title}</p>
                <span
                  className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    b.status === "Available"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-orange-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{b.author}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{b.id}</span>
                <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{b.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
