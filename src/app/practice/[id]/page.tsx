import { notFound } from "next/navigation";
import Link from "next/link";
import { getPractice } from "@/lib/notion";
import { MarkdownContent } from "@/components/markdown-content";

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default async function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const practice = await getPractice(id);

  if (!practice) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block"
      >
        &larr; Back
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              href={`/category/${practice.category.toLowerCase()}`}
              className="text-sm font-medium px-3 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              {practice.category}
            </Link>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColors[practice.difficulty]}`}
            >
              {practice.difficulty}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {practice.title}
          </h1>
          {practice.summary && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {practice.summary}
            </p>
          )}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {practice.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
            Last updated:{" "}
            {new Date(practice.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <MarkdownContent content={practice.content} />
      </article>
    </div>
  );
}
