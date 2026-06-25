import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { PracticeCard } from "@/components/practice-card";
import { getCategories, getAllPractices } from "@/lib/notion";

export const dynamic = "force-dynamic";

async function Categories() {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.slug} category={cat} />
      ))}
    </div>
  );
}

async function RecentPractices() {
  const practices = await getAllPractices();
  const recent = practices.slice(0, 6);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recent.map((p) => (
        <PracticeCard key={p.id} practice={p} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Software Engineering Best Practices
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Curated, searchable collection of best practices across backend,
          frontend, APIs, databases, and more.
        </p>
        <Suspense>
          <SearchBar />
        </Suspense>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Categories
        </h2>
        <Suspense
          fallback={
            <div className="text-gray-500 dark:text-gray-400">
              Loading categories...
            </div>
          }
        >
          <Categories />
        </Suspense>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Recently Updated
        </h2>
        <Suspense
          fallback={
            <div className="text-gray-500 dark:text-gray-400">
              Loading practices...
            </div>
          }
        >
          <RecentPractices />
        </Suspense>
      </section>
    </div>
  );
}
