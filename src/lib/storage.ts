import type { Book } from "./types";
import { buildSeedBooks } from "./seed";

const STORAGE_KEY = "dlms.books.v1";

// Load books from localStorage, seeding the library on first run only.
export function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Book[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Corrupt or missing data — fall through to seeding.
  }

  // First run: seed 1000+ books once and persist so refresh does not duplicate.
  const seeded = buildSeedBooks();
  saveBooks(seeded);
  return seeded;
}

export function saveBooks(books: Book[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // Quota or serialization errors are ignored — state still lives in memory.
  }
}

// Generate the next unique book ID based on the highest existing numeric suffix.
export function nextBookId(books: Book[]): string {
  let max = 0;
  for (const b of books) {
    const match = b.id.match(/^BK(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > max) max = n;
    }
  }
  return `BK${String(max + 1).padStart(5, "0")}`;
}
