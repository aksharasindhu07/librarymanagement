import { CheckCircle2, XCircle, Info } from "lucide-react";
import type { Toast } from "@/hooks/useLibrary";

interface ToastsProps {
  toasts: Toast[];
}

export default function Toasts({ toasts }: ToastsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon = t.kind === "success" ? CheckCircle2 : t.kind === "error" ? XCircle : Info;
        const tone =
          t.kind === "success"
            ? "bg-emerald-600 text-white"
            : t.kind === "error"
            ? "bg-rose-600 text-white"
            : "bg-slate-800 text-white";
        return (
          <div
            key={t.id}
            className={`flex items-start gap-2 rounded-lg px-4 py-3 shadow-lg shadow-slate-900/20 animate-slide-in ${tone}`}
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
