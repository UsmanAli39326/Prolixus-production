import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import CertificateDetail from "@/components/layout/Certificate/CertificateDetail";
import { getCertificateById } from "@/lib/CertificateService";
import { getLocalization } from "@/lib/getLocalization";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const certificate = await getCertificateById(id);
    if (!certificate) return {};
    return {
        title: certificate.metaTitle || `${certificate.title} | Certificate`,
        description: certificate.metaDescription || certificate.shortDescription,
    };
}

export default async function CertificateDetailPage({ params }) {
    const { id } = await params;
    const certificate = await getCertificateById(id);
    if (!certificate) return notFound();

    const localization = await getLocalization();

    return (
        <>
            <PageHeader
                title={certificate.title || "Certificate"}
                pageKey="certificate-detail"
                breadcrumbs={[
                    { label: localization?.product_breadcrumb_home || "Home", href: "/" },
                    { label: certificate.title || "Certificate", href: null }
                ]}
            />
            <CertificateDetail certificate={certificate} localization={localization} />
        </>
    );
}
