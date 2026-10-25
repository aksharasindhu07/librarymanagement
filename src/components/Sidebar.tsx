import { LayoutDashboard, BookOpen, PlusCircle, Tags, BookCheck, CheckCircle2, Info, Library } from "lucide-react";

export type ViewKey =
  | "dashboard"
  | "all"
  | "add"
  | "categories"
  | "issued"
  | "available"
  | "about";

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "all", label: "All Books", icon: BookOpen },
  { key: "add", label: "Add Book", icon: PlusCircle },
  { key: "categories", label: "Categories", icon: Tags },
  { key: "issued", label: "Issued Books", icon: BookCheck },
  { key: "available", label: "Available Books", icon: CheckCircle2 },
  { key: "about", label: "About Project", icon: Info },
];

interface SidebarProps {
  current: ViewKey;
  onNavigate: (view: ViewKey) => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ current, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-slate-900 text-slate-100 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
            <Library className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-wide">DIGITAL LIBRARY</h1>
            <p className="text-[11px] text-slate-400">Management System</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onClose();
                }}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-slate-800 text-[11px] text-slate-500">
          <p>Academic Year 2026–2027</p>
          <p className="mt-1">CMR Technical Campus</p>
        </div>
      </aside>
    </>
  );
}
