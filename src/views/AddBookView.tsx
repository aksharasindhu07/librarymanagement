import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { NewBookInput } from "@/hooks/useLibrary";
import { CATEGORIES } from "@/lib/types";

interface AddBookViewProps {
  onAdd: (input: NewBookInput) => boolean;
  onDone: () => void;
}

export default function AddBookView({ onAdd, onDone }: AddBookViewProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { title?: string; author?: string } = {};
    if (!title.trim()) next.title = "Title is required";
    if (!author.trim()) next.author = "Author is required";
    if (next.title || next.author) {
      setErrors(next);
      return;
    }
    setErrors({});
    const ok = onAdd({ title, author, category });
    if (ok) {
      setTitle("");
      setAuthor("");
      setCategory(CATEGORIES[0]);
      onDone();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <PlusCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Add a New Book</h3>
            <p className="text-sm text-slate-500">A unique ID is generated automatically.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Book Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Introduction to Algorithms"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                errors.title
                  ? "border-rose-400 focus:ring-2 focus:ring-rose-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Author Name *</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Thomas H. Cormen"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                errors.author
                  ? "border-rose-400 focus:ring-2 focus:ring-rose-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {errors.author && <p className="mt-1 text-xs text-rose-600">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/20 hover:from-blue-700 hover:to-indigo-700 transition"
            >
              <PlusCircle className="h-4 w-4" />
              Add Book
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setAuthor("");
                setCategory(CATEGORIES[0]);
                setErrors({});
              }}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
