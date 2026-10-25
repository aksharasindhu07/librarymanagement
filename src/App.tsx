import { useEffect, useMemo, useState } from "react";
import Sidebar, { NAV_ITEMS, type ViewKey } from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Toasts from "@/components/Toasts";
import DashboardView from "@/views/DashboardView";
import BookCollectionView from "@/views/BookCollectionView";
import AddBookView from "@/views/AddBookView";
import CategoriesView from "@/views/CategoriesView";
import AboutView from "@/views/AboutView";
import { useLibrary } from "@/hooks/useLibrary";

export default function App() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lib = useLibrary();

  // Scroll to top whenever the view changes for a fresh feel.
  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const meta = useMemo(() => {
    switch (view) {
      case "dashboard":
        return { title: "Dashboard", subtitle: "Overview of your library", showSearch: false };
      case "all":
        return { title: "All Books", subtitle: "Browse, search and manage your entire collection", showSearch: true };
      case "add":
        return { title: "Add Book", subtitle: "Register a new book in the library", showSearch: false };
      case "categories":
        return { title: "Categories", subtitle: "Browse books grouped by subject", showSearch: false };
      case "issued":
        return { title: "Issued Books", subtitle: "Books currently issued to readers", showSearch: true };
      case "available":
        return { title: "Available Books", subtitle: "Books ready to be issued", showSearch: true };
      case "about":
        return { title: "About Project", subtitle: "Project information and credits", showSearch: false };
    }
  }, [view]);

  // The Issued / Available sidebar entries are fixed filters of "All Books".
  const isCollectionView = view === "all" || view === "issued" || view === "available";
  const collectionStatusFilter =
    view === "issued" ? "Issued" : view === "available" ? "Available" : lib.statusFilter;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Sidebar
        current={view}
        onNavigate={setView}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64 min-h-screen flex flex-col">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          search={lib.search}
          onSearch={lib.setSearch}
          onMenuClick={() => setSidebarOpen(true)}
          showSearch={meta.showSearch}
        />

        <main id="main-scroll" className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {view === "dashboard" && (
            <DashboardView stats={lib.stats} recentBooks={lib.recentBooks} onNavigate={setView} />
          )}

          {view === "add" && <AddBookView onAdd={lib.addBook} onDone={() => setView("all")} />}

          {view === "categories" && (
            <CategoriesView
              categoryCounts={lib.categoryCounts}
              onPick={(name) => {
                lib.setSearch(name);
                setView("all");
              }}
            />
          )}

          {view === "about" && <AboutView />}

          {isCollectionView && (
            <BookCollectionView
              title={
                view === "issued"
                  ? "Issued Books"
                  : view === "available"
                  ? "Available Books"
                  : "All Books"
              }
              subtitle={
                view === "issued"
                  ? "Books currently issued to readers"
                  : view === "available"
                  ? "Books ready to be issued"
                  : "Browse, search and manage your entire collection"
              }
              books={lib.filteredBooks}
              totalCount={lib.stats.total}
              search={lib.search}
              statusFilter={collectionStatusFilter}
              onSearch={lib.setSearch}
              onStatusFilter={lib.setStatusFilter}
              showStatusFilter={view === "all"}
              onDelete={lib.deleteBook}
              onIssue={lib.issueBook}
              onReturn={lib.returnBook}
            />
          )}
        </main>
      </div>

      <Toasts toasts={lib.toasts} />
    </div>
  );
}
