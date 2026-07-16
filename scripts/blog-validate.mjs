import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const blogPostsPath = path.join(repoRoot, "src", "data", "blog-posts.ts");
const blogTopicsPath = path.join(repoRoot, "content", "blog-topics.json");

function fail(message) {
  console.error(`blog:validate failed: ${message}`);
  process.exit(1);
}

function loadBlogPosts() {
  const source = fs.readFileSync(blogPostsPath, "utf8");
  const executable = source
    .replace(/export type[\s\S]*?};\r?\n\r?\n/g, "")
    .replace(/export const blogPosts:\s*BlogPost\[\]\s*=\s*/, "const blogPosts = ")
    .replace(/export function[\s\S]*$/, "");

  const sandbox = { module: { exports: {} } };
  vm.runInNewContext(`${executable}\nmodule.exports = { blogPosts };`, sandbox, {
    filename: "blog-posts.ts",
  });

  return sandbox.module.exports.blogPosts;
}

function validateTopics() {
  if (!fs.existsSync(blogTopicsPath)) {
    fail("content/blog-topics.json does not exist");
  }

  const topics = JSON.parse(fs.readFileSync(blogTopicsPath, "utf8"));
  if (!Array.isArray(topics) || topics.length === 0) {
    fail("content/blog-topics.json must contain at least one queued topic");
  }

  const requiredTopicFields = ["topic", "primaryKeyword", "badgeText", "audience", "angle"];
  for (const [index, topic] of topics.entries()) {
    for (const field of requiredTopicFields) {
      if (typeof topic[field] !== "string" || topic[field].trim().length === 0) {
        fail(`topic ${index + 1} is missing ${field}`);
      }
    }
  }
}

function validatePosts(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    fail("blogPosts must contain at least one post");
  }

  const seenIds = new Set();
  const allowedBlockTypes = new Set(["h2", "h3", "p", "quote"]);
  const requiredFields = [
    "id",
    "title",
    "excerpt",
    "image",
    "badgeText",
    "date",
    "dateISO",
    "readTime",
    "keywords",
    "headings",
    "blocks",
  ];

  for (const [index, post] of posts.entries()) {
    for (const field of requiredFields) {
      if (post[field] == null) {
        fail(`post ${index + 1} (${post.id ?? "missing-id"}) is missing ${field}`);
      }
    }

    if (seenIds.has(post.id)) {
      fail(`duplicate post id: ${post.id}`);
    }
    seenIds.add(post.id);

    const isNewestPost = index === 0;
    if (isNewestPost && post.title.length > 60) {
      fail(`newest post ${post.id} title exceeds 60 characters`);
    }
    if (isNewestPost && post.excerpt.length > 160) {
      fail(`newest post ${post.id} excerpt exceeds 160 characters`);
    }
    if (!Array.isArray(post.keywords) || post.keywords.length === 0) {
      fail(`post ${post.id} must include keywords`);
    }
    if (!Array.isArray(post.headings) || post.headings.length === 0) {
      fail(`post ${post.id} must include headings`);
    }
    if (!Array.isArray(post.blocks) || post.blocks.length === 0) {
      fail(`post ${post.id} must include blocks`);
    }

    const imagePath = path.join(repoRoot, "public", post.image.replace(/^\//, ""));
    if (!fs.existsSync(imagePath)) {
      fail(`post ${post.id} image does not exist: ${post.image}`);
    }

    for (const block of post.blocks) {
      if (!allowedBlockTypes.has(block.type)) {
        fail(`post ${post.id} uses unsupported block type: ${block.type}`);
      }
    }
  }
}

validateTopics();
validatePosts(loadBlogPosts());
console.log("blog:validate OK");
