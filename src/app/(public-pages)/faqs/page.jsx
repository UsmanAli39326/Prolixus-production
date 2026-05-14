import PageHeader from "@/components/layout/PageHeader";
import { getFaqs } from "@/lib/getFaqs";
import FaqsClient from "./FaqsClient";
import { getLocalization } from "@/lib/getLocalization";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: data?.faq_meta_title,
    description: data?.faq_meta_description,
  };
}

export default async function FAQPage() {
  const faqs = await getFaqs();
  const data = await getLocalization();

  return (
    <>
      <PageHeader 
        title={data?.faq_header_title} 
        subtitle={data?.faq_header_subtitle} 
        pageKey="faq"
        breadcrumbs={[
            { label: data?.product_breadcrumb_home, href: "/" },
            { label: data?.faq_breadcrumb_faq, href: null }
        ]}
      />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <FaqsClient faqs={faqs} />
        </div>
      </section>
    </>
  );
}
