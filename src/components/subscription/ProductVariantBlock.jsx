"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProductPricing } from "@/lib/productPricing";
import useCart from "@/Hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductImageGallery, ProductAccordion } from "@/components/layout/Ecommerce/ProductPage";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/ImageService";

export default function ProductVariantBlock({ product, isGrid = false }) {
  const { t } = useLanguage();
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [purchaseType, setPurchaseType] = useState("subscribe"); // 'one-time' | 'subscribe'
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [addStatus, setAddStatus] = useState("idle");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProductPricing(product.id);
        if (data) {
          setPricingData(data);
          // Set default purchase type based on availability
          if (data.subscriptionPlans && data.subscriptionPlans.length > 0) {
            setPurchaseType("subscribe");
          } else {
            setPurchaseType("one-time");
          }

          // Set default variant
          if (data.oneTimeOptions && data.oneTimeOptions.length > 0) {
            setSelectedVariantId(data.oneTimeOptions[0].id);
          }
        } else {
          setError(t("error_fetch_pricing", "Failed to fetch pricing options."));
        }
      } catch (err) {
        setError(t("error_pricing_general", "An error occurred while fetching pricing."));
      } finally {
        setLoading(false);
      }
    }

    if (product?.id) {
      fetchData();
    }
  }, [product?.id]);

  if (loading) {
    return (
      <div className={`animate-pulse flex flex-col ${isGrid ? '' : 'md:flex-row'} gap-8 w-full p-6 bg-(--white-color) rounded-3xl shadow-sm border border-(--divider-color)`}>
        <div className={`w-full ${isGrid ? '' : 'md:w-1/2'} bg-gray-200 aspect-square rounded-2xl`}></div>
        <div className={`w-full ${isGrid ? '' : 'md:w-1/2'} flex flex-col gap-4`}>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded-xl"></div>
            <div className="h-24 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="mt-4 h-32 bg-gray-200 rounded-xl"></div>
          <div className="mt-auto h-12 bg-gray-200 rounded-full w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !pricingData) {
    return null;
  }

  const { oneTimeOptions = [], subscriptionPlans = [], subscriptionBenefits, saveAmount, discountPercentage, productFile } = pricingData;

  // Hide product completely if neither one-time nor subscription tier exists
  if (oneTimeOptions.length === 0 && subscriptionPlans.length === 0) {
    return null;
  }

  const selectedOneTimeOption = oneTimeOptions.find((opt) => opt.id === selectedVariantId) || oneTimeOptions[0];
  const primarySubscription = subscriptionPlans[0];

  const handleAddToCart = () => {
    if (addStatus !== "idle") return;
    setAddStatus("adding");

    const variantId = purchaseType === 'one-time' ? selectedVariantId : primarySubscription?.id;

    const price = purchaseType === 'one-time'
      ? selectedOneTimeOption?.price
      : primarySubscription?.price;

    const label = purchaseType === 'one-time' ? selectedOneTimeOption?.label : primarySubscription?.label;

    const bundleQuantity = purchaseType === 'one-time' ? selectedOneTimeOption?.quantity : primarySubscription?.quantity || 1;

    const cartProduct = {
      ...product,
      productId: product.id,
      title: product.title || product.name,
      name: product.name || product.title,
      price,
      variantId,
      variantLabel: label,
      purchaseType,
      bundleQuantity,
      id: `${product.id}-${variantId}-${purchaseType}`
    };

    addToCart(cartProduct, 1);

    setTimeout(() => setAddStatus("added"), 600);
    setTimeout(() => setAddStatus("idle"), 2000);
  };

  const productImageUrl = productFile?.url ? getImageUrl(productFile.url) : null;
  const selectedOptionFile = purchaseType === 'one-time' ? selectedOneTimeOption?.file : primarySubscription?.file;
  const activeImageUrl = selectedOptionFile?.url ? getImageUrl(selectedOptionFile.url) : null;

  const allImgs = [activeImageUrl, productImageUrl, product.image, ...(product.itemImages || [])].filter(Boolean);
  let uniqueImages = Array.from(new Set(allImgs));

  if (uniqueImages.length === 0 || (uniqueImages.length === 1 && uniqueImages[0].includes("placeholder.png"))) {
    uniqueImages = ["/images/new/prolixus-nutrients.jpeg"];
  }

  return (
    <div className={`flex flex-col ${isGrid ? '' : 'md:flex-row'} gap-6 lg:gap-10 w-full p-5 md:p-8 bg-(--white-color) rounded-3xl shadow-sm border border-(--divider-color)`}>
      {/* LEFT: Product Image Gallery */}
      <div className={`w-full ${isGrid ? '' : 'md:w-1/2'}`}>
        <ProductImageGallery images={uniqueImages} productTitle={product.title} />
      </div>

      {/* RIGHT: Product Details & Options */}
      <div className={`w-full ${isGrid ? '' : 'md:w-1/2'} flex flex-col`}>
        {/* Title & Badge */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            {product.badge && (
              <span className="bg-(--accent-color)/10 text-(--accent-color) text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <span className="text-sm font-medium text-(--primary-color)/60 uppercase tracking-wider">
              {product.category || t("product_category_default", "Premium Supplement")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-accent font-semibold text-(--primary-color) mb-2">
            {product.title}
          </h2>
        </div>

        {/* Description Accordion */}
        <div className="mb-6">
          <ProductAccordion
            items={[
              {
                title: t("product_description_title", "Description"),
                content: product.description || t("product_no_description", "No description available"),
              },
            ]}
          />
        </div>

        {/* Purchase Type Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {primarySubscription && (
            <button
              onClick={() => setPurchaseType("subscribe")}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all relative shadow-sm ${purchaseType === "subscribe"
                ? "border-(--accent-color) bg-(--accent-color)/5"
                : "border-(--accent-color)/50 hover:border-(--accent-color) bg-(--white-color)"
                }`}
            >
              {/* Discount/Best Value Badge */}
              <span className="absolute -top-3 right-4 bg-(--accent-color) text-(--white-color) text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <i className="fa-solid fa-star text-[10px]"></i> {t("product_best_value", "Best Value")}
                {discountPercentage > 0 && ` | ${t("product_save", "Save")} ${discountPercentage}%`}
              </span>
              <span className={`text-base font-bold ${purchaseType === "subscribe" ? "text-(--accent-color)" : "text-(--primary-color)"}`}>
                {t("product_subscribe_save", "Subscribe & save")}
              </span>
            </button>
          )}

          <button
            onClick={() => setPurchaseType("one-time")}
            className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${purchaseType === "one-time"
              ? "border-(--accent-color) bg-(--secondary-color)"
              : "border-(--divider-color) hover:border-(--accent-color)/30 bg-transparent opacity-80"
              }`}
          >
            <span className={`text-base font-semibold ${purchaseType === "one-time" ? "text-(--accent-color)" : "text-(--primary-color)"}`}>
              {t("product_one_time", "One-time purchase")}
            </span>
          </button>
        </div>

        {/* Options based on purchase type */}
        <div className="relative mb-6">
          <AnimatePresence mode="wait">
            {purchaseType === "one-time" ? (
              <motion.div
                key="one-time"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
          <div className="mb-2">
            {(oneTimeOptions.length > 1 || (oneTimeOptions.length === 1 && !isGrid)) && (
              <>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-(--primary-color) mb-3">
                  {t("product_select_quantity", "Select Quantity")}
                </h4>
                <div className="flex flex-col gap-2">
                  {oneTimeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedVariantId(opt.id)}
                      className={`flex items-center justify-between min-h-[64px] p-2.5 px-3 rounded-xl border-2 transition-all ${selectedVariantId === opt.id
                        ? "border-(--accent-color) bg-(--secondary-color)"
                        : "border-(--divider-color) hover:border-(--accent-color)/30"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedVariantId === opt.id ? "border-(--accent-color)" : "border-gray-300"
                          }`}>
                          {selectedVariantId === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-(--accent-color)" />}
                        </div>
                        <span className="font-semibold text-(--primary-color)">{opt.label}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-(--primary-color)">{formatPrice(opt.price)}</span>
                        {opt.quantity > 1 && (
                          <span className="text-xs text-gray-500">{formatPrice(opt.price / opt.quantity)} / {t("product_each", "each")}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          </motion.div>
        ) : (
          <motion.div
            key="subscribe"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="p-5 rounded-2xl bg-(--secondary-color) border border-(--divider-color)">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-(--primary-color)">
                {primarySubscription?.label || t("product_subscription_plan", "Subscription Plan")}
              </h4>
              <span className="text-2xl font-bold text-(--accent-color)">
                {formatPrice(primarySubscription?.price)}<span className="text-sm font-normal text-(--primary-color)/70">/{t("product_per_month", "mo")}</span>
              </span>
            </div>

            {subscriptionBenefits && subscriptionBenefits.length > 0 && (
              <ul className="space-y-3">
                {subscriptionBenefits.map((benefit, idx) => {
                  const normalizedKey = benefit ? `subscribe_${benefit.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : '';
                  const localizedBenefit = benefit === "Cancel anytime"
                    ? t("subscribe_cancel_anytime", "Cancel anytime")
                    : benefit === "Automatic monthly delivery"
                    ? t("subscribe_auto_delivery", "Automatic monthly delivery")
                    : benefit === "Exclusive subscriber savings"
                    ? t("subscribe_subscriber_savings", "Exclusive subscriber savings")
                    : t(normalizedKey, benefit);

                  return (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-(--accent-color) mt-0.5">
                        <i className="fa-solid fa-circle-check"></i>
                      </span>
                      <span className="text-sm text-(--text-color)/90">
                        {localizedBenefit}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-6 border-t border-(--divider-color)">
          <button
            onClick={handleAddToCart}
            disabled={addStatus !== "idle"}
            className={`w-full btn-default rounded-full py-4 text-center text-lg font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden ${addStatus === "added"
              ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
              : "bg-(--accent-color) text-(--white-color) hover:bg-(--primary-color) shadow-md hover:shadow-lg hover:shadow-(--primary-color)/10"
              }`}
          >
            <AnimatePresence mode="wait">
              {addStatus === "adding" ? (
                <motion.span
                  key="adding"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <i className="fa-solid fa-spinner fa-spin"></i> {t("product_adding", "Adding...")}
                </motion.span>
              ) : addStatus === "added" ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="flex items-center gap-2"
                >
                  <i className="fa-solid fa-check"></i> {t("product_added_to_cart", "Added to Cart")}
                </motion.span>
              ) : purchaseType === "one-time" ? (
                <motion.span
                  key="one-time"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("product_add_to_cart", "Add to cart")} — {formatPrice(selectedOneTimeOption?.price || 0)}
                </motion.span>
              ) : (
                <motion.span
                  key="subscribe"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("product_subscribe_button", "Subscribe")} — {formatPrice(primarySubscription?.price || 0)}/{t("product_per_month", "mo")}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}