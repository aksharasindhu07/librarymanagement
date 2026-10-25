import { Tags, BookOpen } from "lucide-react";

interface CategoriesViewProps {
  categoryCounts: { name: string; count: number }[];
  onPick: (name: string) => void;
}

const CATEGORY_COLORS = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-indigo-600",
  "from-emerald-500 to-emerald-600",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-rose-600",
  "from-cyan-500 to-cyan-600",
  "from-violet-500 to-violet-600",
  "from-teal-500 to-teal-600",
];

export default function CategoriesView({ categoryCounts, onPick }: CategoriesViewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Tags className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Library Categories</h3>
            <p className="text-sm text-blue-100">{categoryCounts.length} categories in your collection</p>
          </div>
        </div>
      </div>

      {categoryCounts.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">No categories yet. Add books to populate this section.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryCounts.map((c, i) => {
            const accent = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            return (
              <button
                key={c.name}
                onClick={() => onPick(c.name)}
                className="group text-left rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4 shadow`}>
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <p className="font-semibold text-slate-800 line-clamp-1">{c.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {c.count} {c.count === 1 ? "book" : "books"}
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${accent} group-hover:w-full transition-all`}
                    style={{ width: `${Math.min(100, c.count * 4)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
