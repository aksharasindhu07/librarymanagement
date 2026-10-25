import { Filter } from "lucide-react";
import type { Book } from "@/lib/types";
import type { StatusFilter } from "@/hooks/useLibrary";
import BookTable from "@/components/BookTable";

interface BookCollectionViewProps {
  title: string;
  subtitle: string;
  books: Book[];
  totalCount: number;
  search: string;
  statusFilter: StatusFilter;
  onSearch: (v: string) => void;
  onStatusFilter: (v: StatusFilter) => void;
  showStatusFilter: boolean;
  onDelete: (id: string) => void;
  onIssue: (id: string) => void;
  onReturn: (id: string) => void;
}

const FILTERS: StatusFilter[] = ["All", "Available", "Issued"];

export default function BookCollectionView({
  title,
  subtitle,
  books,
  totalCount,
  statusFilter,
  onStatusFilter,
  showStatusFilter,
  onDelete,
  onIssue,
  onReturn,
}: BookCollectionViewProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        {showStatusFilter && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => onStatusFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                    statusFilter === f
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-700">{books.length}</strong> of {totalCount.toLocaleString()} books
        </span>
      </div>

      <BookTable books={books} onDelete={onDelete} onIssue={onIssue} onReturn={onReturn} />
    </div>
  );
}
