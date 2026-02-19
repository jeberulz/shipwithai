import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Ship With AI",
  description:
    "Practical playbooks, workflows, and experiments for product designers and PMs shipping with AI.",
};

function formatDate(dateValue: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group relative rounded-2xl border border-neutral-200/60 bg-white transition-shadow duration-300 hover:shadow-md overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {post.coverImage && (
        <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Meta */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-neutral-400 font-geist">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
          <span>{post.readingTime} min read</span>
        </div>

        {/* Title */}
        <h2
          className={`tracking-tighter font-newsreader font-light text-neutral-900 ${
            featured ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="hover:text-orange-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-500 font-geist font-normal">
          {post.description}
        </p>

        {/* Tags */}
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Post tags">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-orange-200/60 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600 font-geist"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Read more */}
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-orange-600 transition-colors font-geist group/link"
          >
            Read article
            <svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* Hero */}
      <section className="mb-16">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist mb-6">
          Blog
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-[1.05] tracking-tighter font-newsreader font-light">
          Ideas, Workflows,{" "}
          <span className="text-neutral-400">and Shipping Notes.</span>
        </h1>
        <p className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-2xl font-normal font-geist">
          Practical notes on AI workflows, product shipping velocity, and better design decisions.
        </p>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mb-12" />

      {/* Posts */}
      <section aria-label="Blog posts">
        {featuredPost && (
          <div className="mb-8">
            <PostCard post={featuredPost} featured />
          </div>
        )}

        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
