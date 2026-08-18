export const dynamic = "force-dynamic";
import PageHeader from "@/components/layout/PageHeader";
import BlogListing from "@/components/layout/Blog/BlogListing";
import { getLocalization } from "@/lib/getLocalization";

export const metadata = {
    title: "Blog | Prolixus",
    description:
        "Lesen Sie unsere neuesten Artikel zu Gesundheit, Ernährung, Nahrungsergänzungsmitteln und Wohlbefinden.",
};

export default async function BlogPage() {
    const localization = await getLocalization();

    return (
        <>
            <PageHeader
                title={localization?.blog_header_title}
                subtitle={localization?.blog_header_subtitle}
                pageKey="blog"
                breadcrumbs={[
                    { label: localization?.product_breadcrumb_home, href: "/" },
                    { label: localization?.blog_breadcrumb_blog, href: null }
                ]}
            />
            <BlogListing localization={localization} />
        </>
    );
}
