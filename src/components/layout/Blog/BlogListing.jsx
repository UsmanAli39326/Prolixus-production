import BlogCard from "@/components/layout/Blog/BlogCard";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { getAllPosts } from "@/lib/blogData";
import { cookies } from "next/headers";

export default async function BlogListing({ localization }) {
    const posts = await getAllPosts();

    let lang = "en";
    try {
        const cookieStore = await cookies();
        lang = cookieStore.get("appLanguage")?.value || "en";
    } catch (e) {}
    
    const fallbackTitle = lang === "de" ? "Keine Artikel gefunden" : "No articles found";
    const fallbackDesc = lang === "de" 
        ? "Wir haben derzeit keine Blog-Beiträge veröffentlicht. Schauen Sie bald wieder vorbei für neue Updates und Tipps." 
        : "We currently do not have any blog posts published. Please check back soon.";

    return (
        <section className="blog-listing-section pt-16 pb-24">
            <div className="container mx-auto px-4">

                {/* Intro text */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <FaderInAnimation direction="up">
                        <h3 className="text-sm font-semibold capitalize text-(--primary-color) font-default tracking-[0.2em] mb-3">
                            {localization?.blog_listing_label}
                        </h3>
                    </FaderInAnimation>
                    <RevealInAnimation>
                        <h2 className="font-default text-(--primary-color) text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                            {localization?.blog_listing_title_main}{" "}
                            <span className="font-accent font-light italic">
                                {localization?.blog_listing_title_accent}
                            </span>
                        </h2>
                    </RevealInAnimation>
                    <FaderInAnimation direction="up" delay="0.2s">
                        <p className="mt-4 text-(--text-color)/70 leading-relaxed">
                            {localization?.blog_listing_desc}
                        </p>
                    </FaderInAnimation>
                </div>

                {/* Posts grid */}
                {posts && posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, idx) => (
                            <BlogCard key={idx} post={post} index={idx} localization={localization} />
                        ))}
                    </div>
                ) : (
                    <RevealInAnimation>
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-3xl border border-gray-100/80 mt-8">
                            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-(--primary-color) mb-3">
                                {localization?.blog_empty_title || fallbackTitle}
                            </h3>
                            <p className="text-(--text-color)/60 max-w-md mx-auto leading-relaxed">
                                {localization?.blog_empty_desc || fallbackDesc}
                            </p>
                        </div>
                    </RevealInAnimation>
                )}

            </div>
        </section>
    );
}
