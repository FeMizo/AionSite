import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost } from "@/src/data/blog-posts";
import { BlogPostPage } from "@/src/components/blog/BlogPostPage";
import { withCanonical } from "@/src/lib/metadata";

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
  return <BlogPostPage post={post} />;
}
