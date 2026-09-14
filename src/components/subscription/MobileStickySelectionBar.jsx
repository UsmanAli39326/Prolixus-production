"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { localizePackageTitle } from "@/utitlis/formatters";

export default function MobileStickySelectionBar({
  selectedPackage,
  onContinue
}) {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  if (!selectedPackage) return null;

  const isSubscription = selectedPackage.purchaseType === "subscribe";
  const localizedTitle = localizePackageTitle(selectedPackage.title, t);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-(--white-color) border-t border-(--divider-color) shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden animate-slide-up">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-(--accent-color) truncate">
            {isSubscription ? t("subscribe_badge_subscription", "Subscription Service") : t("subscribe_badge_onetime", "One-Time Purchase")}
          </span>
          <span className="text-sm font-bold text-(--primary-color) truncate">
            {localizedTitle} ({selectedPackage.bottleCount}{" "}
            {selectedPackage.bottleCount === 1 ? t("product_bottle_singular", "Bottle") : t("product_bottle_plural", "Bottles")})
          </span>
          <span className="text-xs font-bold text-(--primary-color)">
            {formatPrice(selectedPackage.price)}
            {isSubscription ? (
              <span className="font-semibold text-(--accent-color)"> / {t("product_per_month", "month")}</span>
            ) : (
              <span className="font-normal text-gray-500"> ({t("subscribe_terms_onetime_short", "Single Payment")})</span>
            )}
          </span>
        </div>

        <button
          onClick={onContinue}
          className="shrink-0 bg-(--accent-color) hover:bg-(--primary-color) text-(--white-color) font-bold text-sm px-6 py-3 rounded-full shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>{t("cart_continue", "Continue")}</span>
          <i className="fa-solid fa-arrow-right text-xs" />
        </button>
      </div>
    </div>
  );
}
