import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { PracticeCard } from "@/components/practice-card";
import { searchPractices, getAllPractices } from "@/lib/notion";

async function SearchResults({ query }: { query: string }) {
  const practices = query
    ? await searchPractices(query)
    : await getAllPractices();

  if (practices.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        No practices found{query ? ` for "${query}"` : ""}. Try a different
        search term.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {practices.map((p) => (
        <PracticeCard key={p.id} practice={p} />
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Search Best Practices
      </h1>
      <div className="mb-8">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      {query && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Results for &ldquo;{query}&rdquo;
        </p>
      )}
      <Suspense
        fallback={
          <div className="text-gray-500 dark:text-gray-400 text-center">
            Searching...
          </div>
        }
      >
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
