"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function MobileStickySelectionBar({
  selectedPackage,
  onContinue
}) {
  const { formatPrice } = useCurrency();

  if (!selectedPackage) return null;

  const isSubscription = selectedPackage.purchaseType === "subscribe";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-(--white-color) border-t border-(--divider-color) shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 md:hidden animate-slide-up">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-(--accent-color) truncate">
            {isSubscription ? "Subscription Service" : "One-Time Purchase"}
          </span>
          <span className="text-sm font-bold text-(--primary-color) truncate">
            {selectedPackage.title} ({selectedPackage.bottleCount}{" "}
            {selectedPackage.bottleCount === 1 ? "Bottle" : "Bottles"})
          </span>
          <span className="text-xs font-bold text-(--primary-color)">
            {formatPrice(selectedPackage.price)}
            {isSubscription ? (
              <span className="font-semibold text-(--accent-color)"> / month</span>
            ) : (
              <span className="font-normal text-gray-500"> (Single Payment)</span>
            )}
          </span>
        </div>

        <button
          onClick={onContinue}
          className="shrink-0 bg-(--accent-color) hover:bg-(--primary-color) text-(--white-color) font-bold text-sm px-6 py-3 rounded-full shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <i className="fa-solid fa-arrow-right text-xs" />
        </button>
      </div>
    </div>
  );
}
