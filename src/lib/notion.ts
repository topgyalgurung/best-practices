import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

export type Practice = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lastUpdated: string;
};

export type Category = {
  name: string;
  count: number;
  slug: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractPlainText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join("") ?? "";
}

function pageToPost(page: any): Practice {
  const props = page.properties;
  return {
    id: page.id,
    title: extractPlainText(props.Title?.title ?? props.Name?.title ?? []),
    category: props.Category?.select?.name ?? "Uncategorized",
    tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
    summary: extractPlainText(props.Summary?.rich_text ?? []),
    difficulty:
      props.Difficulty?.select?.name?.toLowerCase() ?? "intermediate",
    lastUpdated: props["Last Updated"]?.date?.start ?? page.last_edited_time,
    content: "",
  };
}

export async function getAllPractices(): Promise<Practice[]> {
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.search({
      filter: { property: "object", value: "page" },
      start_cursor: cursor,
      page_size: 100,
    });
    const filtered = (response.results as any[]).filter(
      (p: any) =>
        p.parent?.database_id?.replace(/-/g, "") ===
        databaseId.replace(/-/g, "")
    );
    pages.push(...filtered);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages.map(pageToPost).sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

export async function getPracticesByCategory(
  category: string
): Promise<Practice[]> {
  const all = await getAllPractices();
  return all.filter((p) => p.category === category);
}

export async function getPractice(id: string): Promise<Practice | null> {
  try {
    const page: any = await notion.pages.retrieve({ page_id: id });
    const practice = pageToPost(page);
    const md = await notion.pages.retrieveMarkdown({ page_id: id });
    practice.content = (md as any).markdown ?? "";
    return practice;
  } catch {
    return null;
  }
}

export async function searchPractices(query: string): Promise<Practice[]> {
  const response = await notion.search({
    query,
    filter: { property: "object", value: "page" },
    page_size: 20,
  });

  return (response.results as any[])
    .filter(
      (p: any) =>
        p.parent?.database_id?.replace(/-/g, "") ===
        databaseId.replace(/-/g, "")
    )
    .map(pageToPost);
}

export async function getCategories(): Promise<Category[]> {
  const practices = await getAllPractices();
  const categoryMap = new Map<string, number>();

  for (const p of practices) {
    categoryMap.set(p.category, (categoryMap.get(p.category) ?? 0) + 1);
  }

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
    slug: slugify(name),
  }));
}
