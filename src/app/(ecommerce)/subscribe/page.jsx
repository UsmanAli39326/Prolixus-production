import React from "react";
import { getAllProducts, getProductById } from "@/app/api/products/products";
import ShopHero from "@/components/layout/Ecommerce/ProductListingPage/ProductHero";
import ProductListLayout from "@/components/subscription/ProductListLayout";
import CycleExplanationSection from "@/components/subscription/CycleExplanationSection";
import SubscriptionTrustBar from "@/components/subscription/SubscriptionTrustBar";
import SubscriptionFAQ from "@/components/subscription/SubscriptionFAQ";
import { getLocalization } from "@/lib/getLocalization";
import { getSubscribeCopy } from "@/constants/subscriptionCopy";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getLocalization();
  const copy = getSubscribeCopy(data);
  return {
    title: data?.subscribe_meta_title || copy.header.headline,
    description: data?.subscribe_meta_desc || copy.header.subtext,
  };
}

export default async function SubscribePage() {
  const { products: summaryProducts } = await getAllProducts(1, 100);
  const data = await getLocalization();
  const copy = getSubscribeCopy(data);

  // Fetch full details for all products to get their complete image galleries & attributes
  let fullProducts = [];
  if (summaryProducts && summaryProducts.length > 0) {
    const fetched = await Promise.all(summaryProducts.map((p) => getProductById(p.id)));
    fullProducts = fetched.filter(Boolean);
  }

  return (
    <div className="bg-(--secondary-color) min-h-screen pb-16">
      {/* Ecommerce Shop Hero Section */}
      <ShopHero
        title={copy.header.headline}
        subtitle={copy.header.subtext}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Product Cards Layout */}
        {fullProducts.length > 0 ? (
          <>
            <ProductListLayout products={fullProducts} copy={copy} />
            <CycleExplanationSection
              productImage={fullProducts[0]?.image || fullProducts[0]?.itemImages?.[0]}
              copy={copy.cycle}
            />
            <SubscriptionTrustBar copy={copy.trustPillars} />
            <SubscriptionFAQ copy={copy.faqs} faqHeader={copy.faqHeader} />
          </>
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center bg-white p-8 rounded-3xl border border-(--divider-color) shadow-sm">
              <h2 className="font-accent text-2xl font-semibold text-(--primary-color)">
                {data?.product_not_found_title || "No products available"}
              </h2>
              <p className="mt-2 text-(--text-color)/80 text-sm">
                Please check back later.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
