import Link from "next/link";
import type { Category } from "@/lib/notion";

const categoryIcons: Record<string, string> = {
  backend: "🖥️",
  frontend: "🎨",
  api: "🔌",
  apis: "🔌",
  database: "🗄️",
  databases: "🗄️",
  devops: "⚙️",
  security: "🔒",
  testing: "🧪",
  architecture: "🏗️",
  performance: "⚡",
  documentation: "📝",
};

function getIcon(name: string): string {
  const key = name.toLowerCase().replace(/\s+/g, "");
  return categoryIcons[key] ?? "📋";
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <span className="text-3xl">{getIcon(category.name)}</span>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {category.count} {category.count === 1 ? "practice" : "practices"}
        </p>
      </div>
    </Link>
  );
}
