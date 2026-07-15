import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/layout/Blog/BlogCard";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getRelatedPostsById } from "@/lib/blogData";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

async function renderContent(blocks) {
    return blocks.map((block, i) => {
        switch (block.type) {
            case "paragraph":
                return (
                    <FaderInAnimation key={i} direction="up" delay={0.05} duration={0.6}>
                        <p className="mb-6 text-base leading-relaxed text-(--text-color)/80">
                            {block.text}
                        </p>
                    </FaderInAnimation>
                );

            case "heading":
                return (
                    <RevealInAnimation key={i} direction="left" delay={0.05} duration={0.7}>
                        <h2 className="mt-10 mb-4 text-2xl font-bold font-default text-(--primary-color) leading-snug">
                            {block.text}
                        </h2>
                    </RevealInAnimation>
                );

            case "quote":
                return (
                    <FaderInAnimation key={i} direction="up" delay={0.1} duration={0.7}>
                        <blockquote className="my-8 border-l-4 border-(--accent-color) pl-6 py-2 bg-(--accent-color)/5 rounded-r-xl">
                            <p className="text-lg font-medium italic text-(--primary-color) leading-relaxed mb-2">
                                &ldquo;{block.text}&rdquo;
                            </p>
                            {block.author && (
                                <cite className="text-sm not-italic text-(--text-color)/60 font-semibold">
                                    — {block.author}
                                </cite>
                            )}
                        </blockquote>
                    </FaderInAnimation>
                );

            case "list":
                return (
                    <FaderInAnimation key={i} direction="up" delay={0.05} duration={0.6}>
                        <ul className="mb-6 space-y-3 pl-2">
                            {block.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-(--text-color)/80">
                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-(--accent-color) shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </FaderInAnimation>
                );

            default:
                return null;
        }
    });
}

export default async function BlogDetail({ post, localization }) {
    const relatedPosts = await getRelatedPostsById(post.id, 3);

    return (
        <div className="blog-detail-page pt-16 pb-24">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Main Layout: Article + Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* ── Article ── */}
                        <article className="flex-1 min-w-0">

                            {/* Back to Blogs link (Top) */}
                            <FaderInAnimation direction="up" delay={0} duration={0.6}>
                                <div className="mb-6">
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-(--accent-color) hover:text-(--primary-color) transition-colors duration-200"
                                    >
                                        <i className="fa-solid fa-arrow-left text-xs" />
                                        {localization?.blog_back_to_blogs}
                                    </Link>
                                </div>
                            </FaderInAnimation>

                            {/* Category & meta */}
                            <FaderInAnimation direction="up" delay={0} duration={0.6}>
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    {post.category && (
                                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-(--accent-color)/10 text-(--accent-color)">
                                            {post.category}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5 text-sm text-(--text-color)/55">
                                        <i className="fa-solid fa-calendar-days text-(--accent-color)" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-sm text-(--text-color)/55">
                                        <i className="fa-solid fa-user text-(--accent-color)" />
                                        {post.author}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-sm text-(--text-color)/55">
                                        <i className="fa-solid fa-clock text-(--accent-color)" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </FaderInAnimation>

                            {/* Title */}
                            <RevealInAnimation direction="left" delay={0.1} duration={0.8}>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-default text-(--primary-color) leading-tight mb-8">
                                    {post.title}
                                </h1>
                            </RevealInAnimation>

                            {/* Hero image */}
                            <FaderInAnimation direction="up" delay={0.2} duration={0.8}>
                                <figure className="relative mb-10 overflow-hidden rounded-2xl shadow-lg max-w-5xl mx-auto">
                                    <Image
                                        src={post.img}
                                        alt={post.title}
                                        width={1200}
                                        height={800}
                                        unoptimized={true}
                                        className="w-full h-auto block object-contain"
                                    />
                                </figure>
                            </FaderInAnimation>

                            {/* Excerpt lead */}
                            <FaderInAnimation direction="up" delay={0.1} duration={0.7}>
                                <p className="mb-8 text-lg font-medium text-(--primary-color)/80 leading-relaxed border-l-4 border-(--accent-color) pl-5">
                                    {post.excerpt}
                                </p>
                            </FaderInAnimation>

                            {/* Body content */}
                            <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose-blog">
                                {/* {renderContent(post.content)} */}
                            </div>

                            {/* Back link */}
                            <FaderInAnimation direction="up" delay={0.1} duration={0.6}>
                                <div className="mt-12 pt-8 border-t border-(--divider-color) flex items-center justify-between flex-wrap gap-4">
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-(--accent-color) hover:text-(--primary-color) transition-colors duration-200"
                                    >
                                        <i className="fa-solid fa-arrow-left text-xs" />
                                        {localization?.blog_back_to_blogs}
                                    </Link>
                                    {/* <div className="flex items-center gap-3">
                                        <span className="text-sm text-(--text-color)/50">Share:</span>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://prolixus.de" + post.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center h-8 w-8 rounded-full border border-(--divider-color) text-(--text-color)/50 hover:bg-(--accent-color) hover:text-(--white-color) hover:border-(--accent-color) transition-all duration-200"
                                            aria-label="Share on X / Twitter"
                                        >
                                            <FaXTwitter className="text-sm" />
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://prolixus.de" + post.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center h-8 w-8 rounded-full border border-(--divider-color) text-(--text-color)/50 hover:bg-(--accent-color) hover:text-(--white-color) hover:border-(--accent-color) transition-all duration-200"
                                            aria-label="Share on Facebook"
                                        >
                                            <FaFacebookF className="text-sm" />
                                        </a>
                                    </div> */}
                                </div>
                            </FaderInAnimation>
                        </article>

                        {/* ── Sidebar ── */}
                        {/* <aside className="w-full lg:w-80 shrink-0 space-y-8"> */}

                        {/* Author card */}
                        {/* <FaderInAnimation direction="right" delay={0.1} duration={0.7}>
                                <div className="rounded-2xl border border-(--divider-color) bg-(--white-color) p-6 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-(--primary-color)/50 mb-4">
                                        Autor
                                    </h3>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl font-bold text-(--primary-color)">{post.author}</p>
                                        <p className="text-sm text-(--accent-color) font-medium">Prolixus Redaktion</p>
                                    </div>
                                </div>
                            </FaderInAnimation> */}

                        {/* Share */}
                        {/* <FaderInAnimation direction="right" delay={0.3} duration={0.7}>
                                <div className="rounded-2xl border border-(--divider-color) bg-(--white-color) p-6 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-(--primary-color)/50 mb-4">
                                        Artikel teilen
                                    </h3>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: FaXTwitter, label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}` },
                                            { icon: FaFacebookF, label: "FB", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://prolixus.de" + post.href)}` },
                                            { icon: FaLinkedinIn, label: "LI", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://prolixus.de" + post.href)}` },
                                        ].map((s) => (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Share on ${s.label}`}
                                                className="flex items-center justify-center h-10 w-10 rounded-full border border-(--divider-color) text-(--text-color)/60 hover:bg-(--accent-color) hover:text-(--white-color) hover:border-(--accent-color) transition-all duration-200"
                                            >
                                                <s.icon className="text-sm" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </FaderInAnimation> */}

                        {/* CTA */}
                        {/* <FaderInAnimation direction="right" delay={0.4} duration={0.7}>
                                <div className="rounded-2xl bg-(--primary-color) p-6 text-(--white-color)">
                                    <h3 className="text-lg font-bold font-default mb-2 leading-snug">
                                        Prolixus entdecken
                                    </h3>
                                    <p className="text-sm text-(--white-color)/70 mb-5 leading-relaxed">
                                        Erleben Sie, wie gezielte Mikronährstoffe Ihre Vitalität unterstützen können.
                                    </p>
                                    <Link
                                        href="/subscribe"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--accent-color) text-(--white-color) text-sm font-semibold hover:opacity-90 transition"
                                    >
                                        Produkte entdecken
                                        <i className="fa-solid fa-arrow-right text-xs" />
                                    </Link>
                                </div>
                            </FaderInAnimation> */}

                        {/* </aside> */}
                    </div>

                    {/* ── Related Posts ── */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-20 pt-12 border-t border-(--divider-color)">
                            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                                <RevealInAnimation direction="left" duration={0.7}>
                                    <h2 className="text-2xl font-bold font-default text-(--primary-color)">
                                        {localization?.blog_further_articles}
                                    </h2>
                                </RevealInAnimation>
                                <FaderInAnimation direction="up" delay={0.2} duration={0.6}>
                                    <Link
                                        href="/blog"
                                        className="text-sm font-semibold text-(--accent-color) hover:text-(--primary-color) transition-colors duration-200 inline-flex items-center gap-2"
                                    >
                                        {localization?.blog_all_articles}
                                        <i className="fa-solid fa-arrow-right text-xs" />
                                    </Link>
                                </FaderInAnimation>
                            </div>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((p, idx) => (
                                    <BlogCard key={p.id} post={p} index={idx} localization={localization} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
