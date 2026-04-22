import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost } from "@/src/data/blog-posts";
import { BlogPostPage } from "@/src/components/blog/BlogPostPage";
import { withCanonical, getSiteUrl } from "@/src/lib/metadata";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) return {};
  return withCanonical(`/blog/${post.id}`, {
    title: `${post.title} | AionSite Blog`,
    description: post.excerpt,
    keywords: post.keywords,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) notFound();

  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    inLanguage: "es-MX",
    url: `${siteUrl}/blog/${post.id}`,
    author: {
      "@type": "Organization",
      name: "AionSite",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AionSite",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostPage post={post} />
    </>
  );
}
