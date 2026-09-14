"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import useCart from "@/Hooks/useCart";
import { useLanguage } from "@/context/LanguageContext";
import { localizePackageTitle } from "@/utitlis/formatters";

export default function ProductCard({
  packageData,
  isSelected,
  onSelect,
  desktopOrderClass,
  mobileOrderClass,
  copy
}) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [addStatus, setAddStatus] = useState("idle");

  const {
    id,
    title,
    badge,
    bottleCount = 1,
    price = 0,
    purchaseType = "subscribe", // 'subscribe' | 'one-time'
    image,
    termsLine,
    isRecommended,
    productRaw
  } = packageData;

  const isSubscription = purchaseType === "subscribe";
  const pricePerBottle = bottleCount > 0 ? price / bottleCount : price;
  const backendImageUrl = image || productRaw?.image || productRaw?.itemImages?.[0] || null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (addStatus !== "idle") return;
    setAddStatus("adding");

    const cartProduct = {
      ...productRaw,
      productId: productRaw?.id || id,
      title: title,
      name: productRaw?.name || productRaw?.title || title,
      image: backendImageUrl || productRaw?.image || productRaw?.itemImages?.[0] || null,
      price: price,
      variantId: id,
      variantLabel: title,
      purchaseType: purchaseType,
      bundleQuantity: bottleCount,
      id: `${productRaw?.id || id}-${id}-${purchaseType}`
    };

    addToCart(cartProduct, 1);

    setTimeout(() => setAddStatus("added"), 500);
    setTimeout(() => setAddStatus("idle"), 2000);
  };

  return (
    <div
      onClick={() => onSelect && onSelect(packageData)}
      className={`${desktopOrderClass} ${mobileOrderClass} flex flex-col justify-between p-6 sm:p-8 bg-(--white-color) rounded-3xl border-2 transition-all duration-300 relative cursor-pointer ${
        isSelected || isRecommended
          ? "border-(--accent-color) shadow-xl bg-gradient-to-b from-(--secondary-color)/40 to-white"
          : "border-(--divider-color) hover:border-(--accent-color)/40 shadow-xs"
      }`}
    >
      {/* Top Promotional Badge (e.g. Save 25% or Best Value) */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-(--accent-color) text-(--white-color) text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-10 whitespace-nowrap flex items-center gap-1.5">
          <i className="fa-solid fa-star text-[10px]" />
          <span>{badge}</span>
        </div>
      )}

      <div>
        {/* Payment Type Indicator Header */}
        <div className="flex items-center justify-center mb-3 pt-2">
          {isSubscription ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--accent-color)/15 text-(--accent-color) text-xs font-bold uppercase tracking-wider border border-(--accent-color)/30">
              <i className="fa-solid fa-arrows-rotate text-[11px] animate-spin-slowly" />
              <span>{t("subscribe_badge_subscription", copy?.badges?.subscription || "Subscription Service")}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-(--primary-color)/80 text-xs font-bold uppercase tracking-wider border border-gray-200">
              <i className="fa-solid fa-bag-shopping text-[11px]" />
              <span>{t("subscribe_badge_onetime", copy?.badges?.onetime || "One-Time Purchase")}</span>
            </span>
          )}
        </div>

        {/* Package Header */}
        <div className="text-center mb-4">
          <h3 className="text-xl sm:text-2xl font-bold font-accent text-(--primary-color) mb-1">
            {localizePackageTitle(title, t)}
          </h3>
          <p className="text-xs sm:text-sm text-(--text-color)/70 font-default font-medium">
            {bottleCount} {bottleCount === 1 ? t("product_bottle_singular", "Bottle") : t("product_bottle_plural", "Bottles")}
          </p>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6 flex items-center justify-center">
          {backendImageUrl ? (
            <Image
              src={backendImageUrl}
              alt={localizePackageTitle(title, t)}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-(--secondary-color) flex flex-col items-center justify-center p-4 border border-(--divider-color)">
              <i className="fa-solid fa-box-open text-4xl text-(--accent-color) mb-2" />
              <span className="text-xs font-bold text-(--primary-color) text-center">
                {localizePackageTitle(title, t)}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Billing Details */}
        <div className="text-center my-4 p-4 rounded-2xl bg-(--secondary-color) border border-(--divider-color)">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-(--primary-color) tracking-tight">
                {formatPrice(price)}
              </span>
              {isSubscription && (
                <span className="text-sm font-semibold text-(--primary-color)/70">
                  / {t("product_per_month", "mo")}
                </span>
              )}
            </div>

            <span className={`text-xs font-bold mt-1 ${isSubscription ? "text-(--accent-color)" : "text-gray-500"}`}>
              {isSubscription
                ? t("subscribe_terms_subscription", copy?.terms?.subscription || "Billed monthly • Cancel anytime")
                : t("subscribe_terms_onetime", copy?.terms?.onetime || "Single payment • Non-recurring")
              }
            </span>
          </div>

          {bottleCount > 1 && (
            <div className="mt-2 pt-2 border-t border-(--divider-color) text-xs text-(--text-color)/70">
              <span className="font-semibold text-(--primary-color)">
                {formatPrice(pricePerBottle)}
              </span>{" "}
              {t("subscribe_per_bottle", "per bottle")}
            </div>
          )}

          {/* Terms / Renewal Line */}
          <p className="mt-2.5 text-xs font-medium text-(--primary-color)/85 flex items-center justify-center gap-1.5 border-t border-(--divider-color)/50 pt-2">
            <i className={`fa-solid ${isSubscription ? "fa-arrows-rotate text-(--accent-color)" : "fa-shield-check text-green-600"} text-[11px]`} />
            <span>
              {isSubscription
                ? `${t("subscribe_auto_delivery", "Automatic monthly delivery")} • ${t("subscribe_cancel_anytime", "Cancel anytime")}`
                : t("subscribe_terms_onetime_shipment", "One-time payment • Single shipment")
              }
            </span>
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          disabled={addStatus !== "idle"}
          className={`w-full py-3.5 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
            addStatus === "added"
              ? "bg-green-600 text-white"
              : isRecommended || isSelected
              ? "bg-(--accent-color) text-(--white-color) hover:bg-(--primary-color) shadow-lg"
              : "bg-(--primary-color) text-(--white-color) hover:bg-(--accent-color)"
          }`}
        >
          {addStatus === "adding" ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner fa-spin" /> {t("product_adding", "Adding...")}
            </span>
          ) : addStatus === "added" ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-check" /> {t("product_added_to_cart", "Added to Cart")}
            </span>
          ) : isSubscription ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-arrows-rotate text-xs" /> {t("subscribe_cta_subscribe", copy?.cta?.subscribe || "Subscribe")} — {formatPrice(price)}/{t("product_per_month", "mo")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-cart-shopping text-xs" /> {t("subscribe_cta_onetime", copy?.cta?.onetime || "Buy Once")} — {formatPrice(price)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
