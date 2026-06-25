# Best Practices

Searchable, categorized software engineering best practices powered by Next.js and Notion.

## Features

- **Browse by category** — Backend, Frontend, APIs, Databases, DevOps, Security, Testing, Architecture, Performance
- **Full-text search** — powered by Notion's search API
- **Difficulty levels** — Beginner, Intermediate, Advanced
- **Tags** — filter and discover related practices
- **Notion CMS** — add and edit content directly in Notion

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) with Typography plugin
- [Notion API](https://developers.notion.com/) as CMS
- TypeScript

## Setup

1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd best-practices
npm install
```

2. Create a [Notion integration](https://www.notion.so/profile/integrations) and copy the access token.

3. Create a Notion database with these properties:

| Property | Type | Values |
|---|---|---|
| Title | Title | — |
| Category | Select | Backend, Frontend, APIs, Databases, DevOps, Security, Testing, Architecture, Performance |
| Tags | Multi-select | REST, GraphQL, caching, etc. |
| Difficulty | Select | Beginner, Intermediate, Advanced |
| Summary | Rich text | — |
| Last Updated | Date | — |

4. Share the database with your integration (database page → "..." → Connections).

5. Create `.env.local`:

```
NOTION_API_KEY=your_notion_secret
NOTION_DATABASE_ID=your_database_id
```

6. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

Create new pages in your Notion database — they appear automatically in the app. Use the page body for detailed content with headings, code blocks, lists, and callouts.
