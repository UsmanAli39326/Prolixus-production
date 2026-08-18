export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import BlogDetail from "@/components/layout/Blog/BlogDetail";
import { getPostById, getAllPosts } from "@/lib/blogData";
import { getLocalization } from "@/lib/getLocalization";

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

    const localization = await getLocalization();

    return (
        <>
            <PageHeader
                title={post.category || localization?.blog_breadcrumb_blog}
                subtitle={localization?.blog_detail_subtitle}
                pageKey="blog-detail"
                breadcrumbs={[
                    { label: localization?.product_breadcrumb_home, href: "/" },
                    { label: localization?.blog_breadcrumb_blog, href: "/blog" },
                    { label: post.category || localization?.blog_breadcrumb_article, href: null }
                ]}
            />
            <BlogDetail post={post} localization={localization} />
        </>
    );
}
