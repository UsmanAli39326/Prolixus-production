import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Link from "next/link";
import Image from "next/image";


export default function BlogCard({ post, index, localization }) {
    return (
        <FaderInAnimation direction="up" delay={`${index * 0.1}s`}>
            <article className="post-item flex flex-col h-full overflow-hidden rounded-2xl border border-(--divider-color) bg-(--white-color) shadow-[0_0_30px_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.12)] transition-shadow duration-300">
                {/* Featured Image */}
                <div className="post-featured-image">
                    <Link
                        href={`/blog/${post.slug}`}
                        data-cursor-text="View"
                        className="block overflow-hidden"
                    >
                        <figure className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            <Image
                                src={post.thumbnailImg}
                                alt={post.title}
                                width={800}
                                height={600}
                                unoptimized={true}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </figure>
                    </Link>
                </div>

                {/* Body */}
                <div className="post-item-body flex flex-col flex-grow p-6">
                    {/* Category Badge */}
                    {post.category && (
                        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-(--accent-color)/10 text-(--accent-color)">
                            {post.category}
                        </span>
                    )}

                    {/* Content */}
                    <div className="post-item-content flex-grow border-b border-(--divider-color) pb-6 mb-6">
                        <h2 className="text-[20px] leading-snug font-default font-semibold text-(--primary-color)">
                            <Link href={post.href} className="hover:text-(--accent-color) transition-colors duration-200">
                                {post.title}
                            </Link>
                        </h2>
                        {post.excerpt && (
                            <p className="mt-2 text-sm text-(--text-color)/70 leading-relaxed line-clamp-2">
                                {post.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="post-item-footer flex flex-wrap items-center justify-between gap-3">
                        {/* Meta */}
                        <div className="post-meta">
                            <ul className="m-0 flex list-none flex-wrap gap-4 p-0">
                                <li className="flex items-center gap-2 text-sm text-(--text-color)/60">
                                    <i className="fa-solid fa-calendar-days text-(--accent-color) text-base" />
                                    {post.date}
                                </li>
                                {post.author && (
                                    <li className="flex items-center gap-2 text-sm text-(--text-color)/60">
                                        <i className="fa-solid fa-user text-(--accent-color) text-base" />
                                        {post.author}
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Read more */}
                        <div className="post-item-btn">
                            <Link href={post.href} className="readmore-btn text-sm">
                                {localization?.blog_read_more}
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </FaderInAnimation>
    );
}
