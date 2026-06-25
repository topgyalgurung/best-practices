import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PracticeCard } from "@/components/practice-card";
import { getCategories, getPracticesByCategory } from "@/lib/notion";

async function CategoryPractices({ categoryName }: { categoryName: string }) {
  const practices = await getPracticesByCategory(categoryName);

  if (practices.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No practices found in this category yet.
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block"
      >
        &larr; Back to all categories
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {category.name}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {category.count} {category.count === 1 ? "practice" : "practices"}
      </p>
      <Suspense
        fallback={
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        }
      >
        <CategoryPractices categoryName={category.name} />
      </Suspense>
    </div>
  );
}
