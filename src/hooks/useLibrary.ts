import { useCallback, useEffect, useMemo, useState } from "react";
import type { Book, BookStatus } from "@/lib/types";
import { loadBooks, nextBookId, saveBooks } from "@/lib/storage";

export type StatusFilter = "All" | "Available" | "Issued";

export type ToastKind = "success" | "error" | "info";

export interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}

export interface NewBookInput {
  title: string;
  author: string;
  category: string;
}

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [loaded, setLoaded] = useState(false);

  // Load once on mount.
  useEffect(() => {
    setBooks(loadBooks());
    setLoaded(true);
  }, []);

  // Persist whenever books change (after the initial load completes).
  useEffect(() => {
    if (loaded) saveBooks(books);
  }, [books, loaded]);

  const pushToast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const addBook = useCallback(
    (input: NewBookInput): boolean => {
      const title = input.title.trim();
      const author = input.author.trim();
      const category = input.category.trim();
      if (!title || !author || !category) {
        pushToast("Please fill in all fields.", "error");
        return false;
      }
      const id = nextBookId(books);
      const book: Book = { id, title, author, category, status: "Available" };
      setBooks((prev) => [book, ...prev]);
      pushToast(`"${title}" added as ${id}.`, "success");
      return true;
    },
    [books, pushToast]
  );

  const deleteBook = useCallback(
    (id: string) => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      pushToast(`Book ${id} deleted.`, "info");
    },
    [pushToast]
  );

  const issueBook = useCallback(
    (id: string) => {
      let done = false;
      setBooks((prev) =>
        prev.map((b) => {
          if (b.id === id && b.status === "Available") {
            done = true;
            return { ...b, status: "Issued" as BookStatus };
          }
          return b;
        })
      );
      if (done) pushToast(`Book ${id} issued.`, "success");
      else pushToast(`Book ${id} is already issued.`, "error");
      return done;
    },
    [pushToast]
  );

  const returnBook = useCallback(
    (id: string) => {
      let done = false;
      setBooks((prev) =>
        prev.map((b) => {
          if (b.id === id && b.status === "Issued") {
            done = true;
            return { ...b, status: "Available" as BookStatus };
          }
          return b;
        })
      );
      if (done) pushToast(`Book ${id} returned.`, "success");
      else pushToast(`Book ${id} is already available.`, "error");
      return done;
    },
    [pushToast]
  );

  const stats = useMemo(() => {
    const total = books.length;
    const available = books.filter((b) => b.status === "Available").length;
    const issued = books.filter((b) => b.status === "Issued").length;
    const categories = new Set(books.map((b) => b.category)).size;
    return { total, available, issued, categories };
  }, [books]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of books) map.set(b.category, (map.get(b.category) ?? 0) + 1);
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [books]);

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || b.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [books, search, statusFilter]);

  const recentBooks = useMemo(() => books.slice(0, 6), [books]);

  return {
    books,
    filteredBooks,
    recentBooks,
    stats,
    categoryCounts,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addBook,
    deleteBook,
    issueBook,
    returnBook,
    toasts,
    loaded,
  };
}
