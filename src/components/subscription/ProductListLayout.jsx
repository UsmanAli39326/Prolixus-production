"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import MobileStickySelectionBar from "./MobileStickySelectionBar";
import { getProductPricing } from "@/lib/productPricing";
import { useRouter } from "next/navigation";

function resolveBackendImageUrl(fileObjOrUrl, fallbackProduct) {
  const rawUrl = typeof fileObjOrUrl === "string" ? fileObjOrUrl : fileObjOrUrl?.url;
  if (rawUrl) {
    if (rawUrl.startsWith("http")) return rawUrl;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://admin.aa-consultants.de";
    return `${baseUrl}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  }

  if (fallbackProduct?.image) {
    return fallbackProduct.image;
  }
  if (fallbackProduct?.itemImages?.length > 0) {
    return fallbackProduct.itemImages[0];
  }
  return null;
}

function ProductPackageGroup({ product, onSelectPackage, selectedPackage }) {
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPricing() {
      if (!product?.id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProductPricing(product.id);
        setPricingData(data);
      } catch (err) {
        console.error(`Failed to load product pricing for ${product.id}:`, err);
      } finally {
        setLoading(false);
      }
    }

    loadPricing();
  }, [product?.id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-pulse my-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[480px] bg-gray-200 rounded-3xl p-6 flex flex-col justify-between"
          >
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4" />
            <div className="w-full aspect-square bg-gray-300 rounded-2xl mb-4" />
            <div className="h-16 bg-gray-300 rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  const oneTimeOpts = pricingData?.oneTimeOptions || [];
  const subPlans = pricingData?.subscriptionPlans || [];

  const hasOneTime = oneTimeOpts.length > 0;
  const hasSubscription = subPlans.length > 0;

  // HIDE product completely if it has neither one-time nor subscription tier in backend API
  if (!hasOneTime && !hasSubscription) {
    return null;
  }

  // Construct package cards ONLY from options returned by backend API
  const packages = [];
  const benefitsText = pricingData?.subscriptionBenefits?.join(" • ") || null;

  // 1. One-Time options direct from backend API
  oneTimeOpts.forEach((opt, index) => {
    const backendImage = resolveBackendImageUrl(opt.file || pricingData?.productFile, product);
    const quantity = opt.quantity || 1;

    packages.push({
      id: `one-time-${opt.id || index}`,
      title: opt.label || product.title || `Package ${index + 1}`,
      badge: product.badge || null,
      bottleCount: quantity,
      price: opt.price,
      purchaseType: "one-time",
      image: backendImage,
      termsLine: benefitsText,
      isRecommended: false,
      productRaw: product,
      mobileOrderClass: quantity === 1 ? "order-2" : "order-3",
      desktopOrderClass: quantity === 1 ? "md:order-1" : "md:order-3"
    });
  });

  // 2. Subscription options direct from backend API
  subPlans.forEach((plan, index) => {
    const backendImage = resolveBackendImageUrl(plan.file || pricingData?.productFile, product);
    const quantity = plan.quantity || 1;

    packages.push({
      id: `sub-${plan.id || index}`,
      title: plan.label || product.title || "Subscription Plan",
      badge: pricingData?.discountPercentage > 0 ? `Save ${pricingData.discountPercentage}%` : product.badge || null,
      bottleCount: quantity,
      price: plan.price,
      purchaseType: "subscribe",
      image: backendImage,
      termsLine: benefitsText,
      isRecommended: true,
      productRaw: product,
      mobileOrderClass: "order-1",
      desktopOrderClass: "md:order-2"
    });
  });

  // Determine grid columns dynamically based on number of available packages returned by backend API
  const gridColsClass =
    packages.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : packages.length === 2
      ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6 lg:gap-8 items-stretch w-full mb-12`}>
      {packages.map((pkg) => (
        <ProductCard
          key={pkg.id}
          packageData={pkg}
          isSelected={selectedPackage?.id === pkg.id}
          onSelect={onSelectPackage}
          mobileOrderClass={pkg.mobileOrderClass}
          desktopOrderClass={pkg.desktopOrderClass}
        />
      ))}
    </div>
  );
}

export default function ProductListLayout({ products = [] }) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(null);

  if (!products || products.length === 0) {
    return null;
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleContinueCheckout = () => {
    if (selectedPackage) {
      router.push("/checkout");
    }
  };

  return (
    <div className="w-full">
      {products.map((product) => (
        <ProductPackageGroup
          key={product.id}
          product={product}
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />
      ))}

      {/* Mobile Sticky Selection Bar */}
      <MobileStickySelectionBar
        selectedPackage={selectedPackage}
        onContinue={handleContinueCheckout}
      />
    </div>
  );
}
