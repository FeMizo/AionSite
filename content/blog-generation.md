# Blog Generation Rules

This folder drives the scheduled blog workflow.

## Contract

Generated posts must be inserted into `src/data/blog-posts.ts` as `BlogPost` objects with:

- `id`, `title`, `excerpt`, `image`, `badgeText`, `date`, `dateISO`, `readTime`
- `keywords`, `headings`, `blocks`
- block types limited to `h2`, `h3`, `p`, and `quote`
- new posts inserted as the first element inside `export const blogPosts: BlogPost[] = [...]`

## SEO Rules

- `title` must be 60 characters or fewer.
- `excerpt` is used as the meta description and must be 160 characters or fewer.
- `id` must be a URL-safe slug and must not duplicate an existing post.
- `image` must point to `/blog/<slug>.webp`.

## Image Style

Default image prompt style:

> Editorial tech illustration for a premium web agency blog. Modern digital workspace, SEO and web performance concepts, clean composition, high contrast, deep navy background with balanced cyan and warm accent details, no text, no logos, no watermark, professional and polished.

The workflow saves generated images to `public/blog/<slug>.webp`.
