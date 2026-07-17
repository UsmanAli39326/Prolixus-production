import { getLocalization } from "@/lib/getLocalization";
import PageHeader from '@/components/layout/PageHeader';
import CertificatesSection from '@/components/layout/Certificates/Certificates';
import React from 'react';

export async function generateMetadata() {
    const data = await getLocalization();
    return {
        title: data?.certificates_meta_title || "Certificates",
        description: data?.certificates_meta_description || "View our brand certificates and quality commitments.",
    };
}

export default async function CertificatesPage() {
  const data = await getLocalization();

  return (
    <>
      <PageHeader
        title={data?.certificates_header_title || "Certificates"}
        subtitle={data?.certificates_header_subtitle || "Our commitment to quality"}
        pageKey="certificates"
        className="min-h-[240px] pt-16 lg:min-h-[160px] lg:pt-0"
        breadcrumbs={[
            { label: data?.product_breadcrumb_home || "Home", href: "/" },
            { label: data?.certificates_breadcrumb || "Certificates", href: null }
        ]}
      />
      <CertificatesSection localization={data} />
    </>
  );
}
