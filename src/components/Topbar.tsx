import { Search, Menu } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle: string;
  search: string;
  onSearch: (value: string) => void;
  onMenuClick: () => void;
  showSearch: boolean;
}

export default function Topbar({ title, subtitle, search, onSearch, onMenuClick, showSearch }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{title}</h2>
          <p className="text-xs sm:text-sm text-slate-500 truncate">{subtitle}</p>
        </div>

        {showSearch && (
          <div className="relative w-44 sm:w-72 lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search title, author, category..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
        )}
      </div>
    </header>
  );
}
