import Hero from "@/components/layout/Home/Hero";
import AboutSection from "@/components/layout/About Us/About";
import OurBenefits from "@/components/layout/Home/OurBenefits";
import WhatWeDo from "@/components/layout/Home/WhatWeDo";
import OurKeyPoints from "@/components/layout/Home/OurKeyPoints";
import OurTestimonials from "@/components/layout/Home/Testemonials";
import CtaBox from "@/components/layout/Home/CtaBox";
import YouTubeGallery from "@/components/layout/Home/YouTubeGallery";
import { Suspense } from "react";
import DynamicProductsSection from "@/components/layout/Home/DynamicProductsSection";
import { getLocalization } from "@/lib/getLocalization";

export const metadata = {
  title: "Prolixus - Premium Organic Products",
  description: "Shop nature's finest organic ingredients, curated for your holistic well-being.",
};

import ProductCardSkeleton from "@/components/layout/Ecommerce/ProductListingPage/ProductCardSkeleton";

const ProductsLoading = () => (
  <section className="our-products py-16">
    <div className="container mx-auto px-4">
      {/* Header Placeholder */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between animate-pulse">
        <div className="max-w-xl space-y-4">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-10 w-64 rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-44 rounded-full bg-gray-200"></div>
      </div>

      {/* Grid Placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default async function Home() {
  const data = await getLocalization();
  
  // Group flattened data keys for components
  const homeData = {
    hero: {
      subtitle: data?.hero_subtitle,
      title_line1: data?.hero_title_line1,
      title_line2: data?.hero_title_line2,
      title_line3: data?.hero_title_line3,
      description: data?.hero_description,
      button_text: data?.hero_button_text,
      phone_label: data?.hero_phone_label,
      phone_sublabel: data?.hero_phone_sublabel,
      phone_number: data?.hero_phone_number,
    },
    about: {
      label: data?.about_label,
      explore_button: data?.about_explore_button,
      natural_origin_label: data?.about_natural_origin_label,
      pure_vitality_label: data?.about_pure_vitality_label,
      image_alt: data?.about_image_alt,
    },
    products: {
      label: data?.products_label,
      title_main: data?.products_title_main,
      title_accent: data?.products_title_accent,
      view_all_button: data?.products_view_all_button,
    },
    whatwedo: {
      label: data?.whatwedo_label,
      title_main: data?.whatwedo_title_main,
      title_accent: data?.whatwedo_title_accent,
      item1_title: data?.whatwedo_item1_title,
      item1_desc: data?.whatwedo_item1_desc,
      item2_title: data?.whatwedo_item2_title,
      item2_desc: data?.whatwedo_item2_desc,
    },
    benefits: {
      label: data?.benefits_label,
      title_main: data?.benefits_title_main,
      title_accent: data?.benefits_title_accent,
      msm_title: data?.benefits_msm_title,
      msm_desc: data?.benefits_msm_desc,
      calcium_title: data?.benefits_calcium_title,
      calcium_desc: data?.benefits_calcium_desc,
      magnesium_title: data?.benefits_magnesium_title,
      magnesium_desc: data?.benefits_magnesium_desc,
      eisen_title: data?.benefits_eisen_title,
      eisen_desc: data?.benefits_eisen_desc,
      vitaminc_title: data?.benefits_vitaminc_title,
      vitaminc_desc: data?.benefits_vitaminc_desc,
    },
    testimonials: {
      label: data?.testimonials_label,
      title_main: data?.testimonials_title_main,
      title_accent: data?.testimonials_title_accent,
      happy_customers_text: data?.testimonials_happy_customers_text,
    },
    keypoints: {
      label: data?.keypoints_label,
      title_main: data?.keypoints_title_main,
      title_accent: data?.keypoints_title_accent,
      desc: data?.keypoints_desc,
      item1_title: data?.keypoints_item1_title,
      item1_desc: data?.keypoints_item1_desc,
      item2_title: data?.keypoints_item2_title,
      item2_desc: data?.keypoints_item2_desc,
      item3_title: data?.keypoints_item3_title,
      item3_desc: data?.keypoints_item3_desc,
      item4_title: data?.keypoints_item4_title,
      item4_desc: data?.keypoints_item4_desc,
      item5_title: data?.keypoints_item5_title,
      item5_desc: data?.keypoints_item5_desc,
      item6_title: data?.keypoints_item6_title,
      item6_desc: data?.keypoints_item6_desc,
    },
    cta: {
      title_line1: data?.cta_title_line1,
      title_line2: data?.cta_title_line2,
      description: data?.cta_description,
      button_text: data?.cta_button_text,
    },
    youtube: {
      label: data?.youtube_label,
      title_main: data?.youtube_title_main,
      title_accent: data?.youtube_title_accent,
      button_text: data?.youtube_button_text,
    },
  };

  return (
    <>
      <Hero data={homeData.hero} />
      <AboutSection variant="short" localization={homeData.about} />
      <Suspense fallback={<ProductsLoading />}>
        <DynamicProductsSection localization={homeData.products} />
      </Suspense>
      <WhatWeDo data={homeData.whatwedo} />
      <OurBenefits data={homeData.benefits} />
      <OurTestimonials data={homeData.testimonials} />
      <OurKeyPoints data={homeData.keypoints} />
      <CtaBox data={homeData.cta} />
      <YouTubeGallery data={homeData.youtube} />
    </>
  );
}