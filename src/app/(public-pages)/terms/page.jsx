import PageHeader from "@/components/layout/PageHeader";
import { getCustomPages } from "@/lib/getCustomPages";
import { getLocalization } from "@/lib/getLocalization";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: data?.terms_meta_title,
    description: data?.terms_meta_description,
  };
}

export default async function TermsPage() {
  const pages = await getCustomPages();
  const data = await getLocalization();
  const pageData = pages.find(p => p.displayNameTl === "Term & Conditions");

  return (
    <>
      <PageHeader 
        title={pageData?.displayNameTl || data?.terms_header_title} 
        subtitle="" 
        pageKey="terms"
      />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          {pageData ? (
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
              <div 
                className="dynamic-content-wrapper"
                dangerouslySetInnerHTML={{ __html: pageData.descriptionText }} 
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center">
              <p className="text-text/60">Terms and conditions are currently unavailable.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}