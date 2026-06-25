import { getLocalization } from "@/lib/getLocalization";
import AboutPageHeader from '@/components/layout/PageHeader';
import About from '@/components/layout/About Us/About';
import TeamMembers from '@/components/layout/About Us/TeamMembers';
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
      <About 
        localization={{
          label: data?.about_label,
          explore_button: data?.about_explore_button,
          natural_origin_label: data?.about_natural_origin_label,
          pure_vitality_label: data?.about_pure_vitality_label,
          image_alt: data?.about_image_alt,
        }} 
      />
      <TeamMembers localization={data} />
    </>
  );
}