import React from "react";

export default function ShopTopBar({ total = 0, showing = 0, onOpenFilters, filtersOpen, localization }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-sm text-(--text-color)/70">
        {localization?.shop_showing_prefix} {showing} {localization?.shop_showing_of} {total} {localization?.shop_showing_suffix}
      </span>

      <button
        type="button"
        onClick={onOpenFilters}
        className={`lg:hidden inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors
          ${filtersOpen
            ? "border-(--accent-color) bg-(--accent-color)/10 text-(--accent-color)"
            : "border-(--divider-color) bg-white/60 text-(--primary-color) hover:text-(--accent-color)"
          }`}
      >
        <span className="text-[16px]">{filtersOpen ? "✕" : "☰"}</span>
        {filtersOpen ? localization?.shop_close_filters : localization?.shop_filters_button}
      </button>
    </div>
  );
}

