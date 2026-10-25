import { useState } from "react";
import { Trash2, ArrowUpRight, ArrowDownLeft, BookX } from "lucide-react";
import type { Book } from "@/lib/types";

interface BookTableProps {
  books: Book[];
  onDelete: (id: string) => void;
  onIssue: (id: string) => void;
  onReturn: (id: string) => void;
}

export default function BookTable({ books, onDelete, onIssue, onReturn }: BookTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-semibold">Book ID</th>
              <th className="px-4 py-3 text-left font-semibold">Book Title</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/70 transition">
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-slate-500">{b.id}</td>
                <td className="px-4 py-3 max-w-xs">
                  <span className="font-medium text-slate-800 line-clamp-2">{b.title}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-600">{b.author}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md">{b.category}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      b.status === "Available"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-orange-700"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${b.status === "Available" ? "bg-emerald-500" : "bg-orange-500"}`} />
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="inline-flex items-center gap-1.5">
                    {b.status === "Available" ? (
                      <button
                        onClick={() => onIssue(b.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-amber-100 text-orange-700 px-2.5 py-1.5 text-xs font-semibold hover:bg-amber-200 transition"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" /> Issue
                      </button>
                    ) : (
                      <button
                        onClick={() => onReturn(b.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-100 text-emerald-700 px-2.5 py-1.5 text-xs font-semibold hover:bg-emerald-200 transition"
                      >
                        <ArrowDownLeft className="h-3.5 w-3.5" /> Return
                      </button>
                    )}

                    {confirmId === b.id ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => {
                            onDelete(b.id);
                            setConfirmId(null);
                          }}
                          className="rounded-md bg-rose-600 text-white px-2.5 py-1.5 text-xs font-semibold hover:bg-rose-700 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="rounded-md bg-slate-200 text-slate-700 px-2 py-1.5 text-xs font-semibold hover:bg-slate-300 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(b.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 text-slate-600 px-2.5 py-1.5 text-xs font-semibold hover:bg-rose-100 hover:text-rose-700 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookX className="h-12 w-12 text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-600">No books match your search.</p>
          <p className="text-xs text-slate-400">Try a different keyword or filter.</p>
        </div>
      )}
    </div>
  );
}
