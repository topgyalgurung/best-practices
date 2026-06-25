import Link from "next/link";
import type { Practice } from "@/lib/notion";

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function PracticeCard({ practice }: { practice: Practice }) {
  return (
    <Link
      href={`/practice/${practice.id}`}
      className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {practice.title}
        </h3>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${difficultyColors[practice.difficulty]}`}>
          {practice.difficulty}
        </span>
      </div>
      {practice.summary && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {practice.summary}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {practice.category}
        </span>
        {practice.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
