import PageHeader from "@/components/layout/PageHeader";
import BlogListing from "@/components/layout/Blog/BlogListing";

export const metadata = {
    title: "Blog | Prolixus",
    description:
        "Lesen Sie unsere neuesten Artikel zu Gesundheit, Ernährung, Nahrungsergänzungsmitteln und Wohlbefinden.",
};

export default function BlogPage() {
    return (
        <>
            <PageHeader
                title="Unser"
                subtitle="Blog"
                mobileBgImage="/images/new/Blog listing mobile view.webp"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: null }
                ]}
            />
            <BlogListing />
        </>
    );
}
