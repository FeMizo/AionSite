import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost } from "@/src/data/blog-posts";
import { BlogPostPage } from "@/src/components/blog/BlogPostPage";
import { withCanonical, getSiteUrl } from "@/src/lib/metadata";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";

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
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const ogImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/logo-aionsite.png`;
  return withCanonical(`/blog/${post.id}`, {
    title: `${post.title} | AionSite Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | AionSite Blog`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.id}`,
      siteName: "AionSite",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.dateISO,
      locale: "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | AionSite Blog`,
      description: post.excerpt,
      images: [ogImage],
    },
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
  const featuredImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/logo-aionsite.png`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: featuredImage,
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
      <BreadcrumbSchema
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.id}` },
        ]}
      />
      <BlogPostPage post={post} />
    </>
  );
}
