# Portfolio V3

A minimalist portfolio built with Next.js 15, TypeScript, Tailwind CSS v4, and MDX.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding a New Case Study

1. Copy the template file:
   ```bash
   cp content/work/_template.mdx content/work/my-project.mdx
   ```

2. Edit the frontmatter (title, subtitle, slug, metrics, etc.)

3. Write your case study content using markdown and custom MDX modules:
   - `<SummaryHighlight>` — key takeaway callout
   - `<ImageGrid columns={2}>` — responsive image grid
   - `<CaseImage src="..." alt="..." />` — optimized image with rounded corners

4. Save the file. The project appears automatically on the Work feed.

## Project Structure

- `app/` — Next.js App Router pages
- `components/` — UI, layout, MDX modules
- `content/work/` — Case study MDX files
- `lib/` — Content parsing, types, constants

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX + gray-matter
- **Animation:** Framer Motion
- **Fonts:** Geist Sans + Newsreader
