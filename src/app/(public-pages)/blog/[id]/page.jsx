import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import BlogDetail from "@/components/layout/Blog/BlogDetail";
import { getPostById, getAllPosts } from "@/lib/blogData";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return {};
    return {
        title: `${post.title} | Prolixus Blog`,
        description: post.excerpt,
    };
}

export default async function BlogDetailPage({ params }) {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return notFound();

    return (
        <>
            <PageHeader
                title={post.category || "Blog"}
                subtitle="Artikel"
                bgImage={"/images/new/blog detail page banner.webp"}
                mobileBgImage={"/images/new/Blog details mobile view.webp"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: post.category || "Artikel", href: null }
                ]}
            />
            <BlogDetail post={post} />
        </>
    );
}
