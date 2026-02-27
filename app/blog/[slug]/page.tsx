import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getAdjacentPosts, getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import { MetaPixelViewContent } from "@/components/meta-pixel-events";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(dateValue: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Ship With AI",
    };
  }

  const siteUrl = "https://www.designandcodewithai.com";
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const openGraphImage = post.coverImage ?? "/images/blog/default-og.jpg";

  return {
    title: `${post.title} | Ship With AI`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
      authors: [post.author],
      images: [
        {
          url: openGraphImage.startsWith("http")
            ? openGraphImage
            : `${siteUrl}${openGraphImage}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        openGraphImage.startsWith("http")
          ? openGraphImage
          : `${siteUrl}${openGraphImage}`,
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processedMarkdown = await remark()
    .use(remarkHtml, { sanitize: true })
    .process(post.content);
  const htmlContent = processedMarkdown.toString();
  const { previousPost, nextPost } = getAdjacentPosts(post.slug);
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: post.coverImage
      ? post.coverImage.startsWith("http")
        ? post.coverImage
        : `${siteUrl}${post.coverImage}`
      : `${siteUrl}/images/blog/default-og.jpg`,
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <MetaPixelViewContent
        contentName={post.title}
        contentCategory="blog"
        contentType="article"
      />
      <article>
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 shadow-sm font-medium font-geist mb-8 hover:border-neutral-300 hover:text-neutral-700 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <ul className="flex flex-wrap gap-2 mb-6" aria-label="Post tags">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-orange-200/60 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600 font-geist"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-neutral-900 font-newsreader leading-[1.1]">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-neutral-500 leading-relaxed font-normal font-geist max-w-2xl">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-400 font-geist">
            <span className="font-medium text-neutral-600">{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
            <span>{post.readingTime} min read</span>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mb-12 -mx-6 md:mx-0 aspect-[2/1] overflow-hidden rounded-none md:rounded-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 56rem"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </div>
        )}

        {/* Body */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Navigation */}
      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

      <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Post navigation">
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-neutral-200/60 bg-white p-5 transition-shadow duration-300 hover:shadow-md"
          >
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-geist flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Previous
            </span>
            <span className="text-base font-light tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors font-newsreader line-clamp-2">
              {previousPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col items-end gap-2 rounded-2xl border border-neutral-200/60 bg-white p-5 transition-shadow duration-300 hover:shadow-md text-right"
          >
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-geist flex items-center gap-1.5">
              Next
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <span className="text-base font-light tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors font-newsreader line-clamp-2">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </main>
  );
}
