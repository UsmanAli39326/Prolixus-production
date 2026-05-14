import { getLocalization } from "@/lib/getLocalization";
import AboutPageHeader from '@/components/layout/PageHeader';
import About from '@/components/layout/About Us/About';
import React from 'react';

export async function generateMetadata() {
    const data = await getLocalization();
    return {
        title: data?.about_meta_title,
        description: data?.about_meta_description,
    };
}

export default async function AboutPage() {
  const data = await getLocalization();

  return (
    <>
      <AboutPageHeader
        title={data?.about_header_title}
        subtitle={data?.about_header_subtitle}
        pageKey="about"
        breadcrumbs={[
            { label: data?.product_breadcrumb_home, href: "/" },
            { label: data?.about_breadcrumb_about, href: null }
        ]}
      />
      <About localization={data} />
    </>
  );
}