import React from "react";
import { getAllProducts, getProductById } from "@/app/api/products/products";
import ProductListLayout from "@/components/subscription/ProductListLayout";
import { getLocalization } from "@/lib/getLocalization";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Subscribe & Save | Prolixus",
  description: "Choose your preferred quantity or subscribe and save on our premium products.",
};

export default async function SubscribePage() {
  const { products: summaryProducts } = await getAllProducts(1, 100);
  const data = await getLocalization();

  // Fetch full details for all products to get their complete image galleries
  let fullProducts = [];
  if (summaryProducts && summaryProducts.length > 0) {
    const fetched = await Promise.all(summaryProducts.map((p) => getProductById(p.id)));
    fullProducts = fetched.filter(Boolean);
  }

  return (
    <div className="bg-(--secondary-color) overflow-hidden min-h-[80vh]">
      <div className="mx-auto max-w-5xl px-4 py-4 mt-4 lg:mt-8">
        {fullProducts.length > 0 ? (
          <ProductListLayout products={fullProducts} />
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="font-accent text-2xl font-semibold text-(--primary-color)">
                {data?.product_not_found_title || "No products found"}
              </h1>
              <p className="mt-2 text-(--text-color)">
                Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
