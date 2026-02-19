import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function isValidDateString(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function assertFrontmatter(
  data: Record<string, unknown>,
  fileName: string,
): asserts data is BlogFrontmatter {
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`Missing or invalid 'title' in ${fileName}`);
  }

  if (typeof data.description !== "string" || !data.description.trim()) {
    throw new Error(`Missing or invalid 'description' in ${fileName}`);
  }

  if (typeof data.publishedAt !== "string" || !isValidDateString(data.publishedAt)) {
    throw new Error(`Missing or invalid 'publishedAt' in ${fileName}`);
  }

  if (data.updatedAt != null && (typeof data.updatedAt !== "string" || !isValidDateString(data.updatedAt))) {
    throw new Error(`Invalid 'updatedAt' in ${fileName}`);
  }

  if (typeof data.author !== "string" || !data.author.trim()) {
    throw new Error(`Missing or invalid 'author' in ${fileName}`);
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Missing or invalid 'tags' in ${fileName}`);
  }

  if (data.coverImage != null && typeof data.coverImage !== "string") {
    throw new Error(`Invalid 'coverImage' in ${fileName}`);
  }

  if (data.draft != null && typeof data.draft !== "boolean") {
    throw new Error(`Invalid 'draft' in ${fileName}`);
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 238;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function getMarkdownFileNames(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));
}

function parsePostFromFile(fileName: string): BlogPost {
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const rawFile = fs.readFileSync(filePath, "utf8");
  const parsed = matter(rawFile);
  const data = parsed.data as Record<string, unknown>;

  assertFrontmatter(data, fileName);

  const slug = fileName.replace(/\.md$/, "");

  return {
    slug,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: data.author,
    tags: data.tags,
    coverImage: data.coverImage,
    draft: data.draft,
    content: parsed.content,
    readingTime: calculateReadingTime(parsed.content),
  };
}

function sortByPublishedDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllPostSlugs(): string[] {
  return getMarkdownFileNames().map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  const posts = getMarkdownFileNames().map(parsePostFromFile);
  const visiblePosts = includeDrafts ? posts : posts.filter((post) => !post.draft);

  return sortByPublishedDateDesc(visiblePosts);
}

export function getPostBySlug(slug: string, includeDrafts = false): BlogPost | null {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = parsePostFromFile(`${slug}.md`);

  if (!includeDrafts && post.draft) {
    return null;
  }

  return post;
}

export function getAdjacentPosts(slug: string): {
  previousPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
} {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  const previousPost = posts[currentIndex + 1] ?? null;
  const nextPost = posts[currentIndex - 1] ?? null;

  return {
    previousPost,
    nextPost,
  };
}
