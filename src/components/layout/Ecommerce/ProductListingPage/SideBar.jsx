"use client";
import React, { useState, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function FiltersSidebar({ 
  categories, 
  filters, 
  minLimit, 
  maxLimit, 
  currentPriceRange, 
  onPriceChange, 
  currentSort, 
  onSortChange,
  currentCategory,
  onCategoryChange,
  localization 
}) {
  const { formatPrice } = useCurrency();

  // Local state for the slider to ensure smooth dragging (non-blocking)
  const [localMin, setLocalMin] = useState(currentPriceRange?.min ?? minLimit);
  const [localMax, setLocalMax] = useState(currentPriceRange?.max ?? maxLimit);

  // Sync local state if the URL/props change from outside
  useEffect(() => {
    setLocalMin(currentPriceRange?.min ?? minLimit);
  }, [currentPriceRange?.min, minLimit]);

  useEffect(() => {
    setLocalMax(currentPriceRange?.max ?? maxLimit);
  }, [currentPriceRange?.max, maxLimit]);

  // Visual only update
  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    setLocalMin(Math.min(val, localMax - 1));
  };

  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    setLocalMax(Math.max(val, localMin + 1));
  };

  // Sync with URL/Manager only when the user releases the thumb
  const triggerPriceChange = () => {
    if (onPriceChange) {
      onPriceChange({ min: localMin, max: localMax });
    }
  };

  return (
    <aside className="rounded-[18px] border border-(--divider-color) bg-(--white-color) p-5 lg:p-6">
      <div className="space-y-8">
        {/* Categories */}
        <section className="border-b border-(--divider-color) pb-6">
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            {localization?.shop_sidebar_categories}
          </h3>

          <div className="space-y-1">
            {categories.map((cat) => {
              const hasActiveChild = cat.children?.some(child => child.id === currentCategory || child.label === currentCategory);
              const isParentActive = cat.id === currentCategory || cat.label === currentCategory;
              
              return (
                <details
                  key={cat.id || cat.label}
                  className="group border-t border-(--divider-color)/50 first:border-t-0"
                  open={hasActiveChild || isParentActive}
                >
                  <summary 
                    className={`flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium transition-colors hover:text-(--accent-color) ${isParentActive ? "text-(--accent-color)" : "text-(--primary-color)"}`}
                    onClick={(e) => {
                      if (!cat.children?.length) {
                        e.preventDefault();
                        onCategoryChange(cat.id || cat.label);
                      }
                    }}
                  >
                    <span>{cat.label}</span>
                    {cat.children?.length ? (
                      <span className="select-none text-xs text-(--text-color)/70 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    ) : null}
                  </summary>

                  {cat.children?.length ? (
                    <div className="flex flex-col gap-2 pb-3 pl-2 pt-1 text-sm">
                      {cat.children.map((child) => {
                        const childId = child.id || child.label;
                        const isActive = childId === currentCategory;
                        return (
                          <button
                            key={childId}
                            onClick={() => onCategoryChange(childId)}
                            className={[
                              "relative pl-3 text-left transition-colors hover:text-(--primary-color)",
                              isActive ? "font-medium text-(--primary-color)" : "text-(--text-color)/80",
                            ].join(" ")}
                          >
                            {/* Active indicator (premium, not loud) */}
                            {isActive ? (
                              <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-(--accent-color)" />
                            ) : null}
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </details>
              );
            })}
          </div>
        </section>

        {/* Price Range */}
        <section className="border-b border-(--divider-color) pb-6">
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            {localization?.shop_sidebar_price_range}
          </h3>

          <div className="px-1">
            <div className="flex flex-col gap-4 mt-6 mb-2">
              <div className="flex items-center justify-between text-sm font-bold text-(--primary-color)">
                <span>{formatPrice(localMin)}</span>
                <span>{formatPrice(localMax)}</span>
              </div>

              <div className="relative h-1 w-full bg-(--divider-color) rounded-lg mb-2 mt-2">
                {/* Active Track Highlight */}
                <div
                  className="absolute h-full bg-(--accent-color) rounded-lg pointer-events-none transition-all duration-75"
                  style={{
                    left: `${(( localMin - minLimit ) / (maxLimit - minLimit)) * 100}%`,
                    right: `${100 - (( localMax - minLimit ) / (maxLimit - minLimit)) * 100}%`
                  }}
                />

                {/* Min Slider */}
                <input
                  type="range"
                  min={minLimit}
                  max={maxLimit}
                  value={localMin}
                  onChange={handleMinChange}
                  onMouseUp={triggerPriceChange}
                  onTouchEnd={triggerPriceChange}
                  className={`absolute w-full -top-2 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--white-color) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--accent-color) [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing ${localMin > maxLimit / 2 ? "z-40" : "z-20"}`}
                />

                {/* Max Slider */}
                <input
                  type="range"
                  min={minLimit}
                  max={maxLimit}
                  value={localMax}
                  onChange={handleMaxChange}
                  onMouseUp={triggerPriceChange}
                  onTouchEnd={triggerPriceChange}
                  className={`absolute w-full -top-2 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--white-color) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--accent-color) [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing ${localMax < maxLimit / 2 ? "z-40" : "z-30"}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sort */}
        <section>
          <h3 className="mb-4 font-accent text-xl font-semibold text-(--primary-color)">
            {localization?.shop_sidebar_sort_by}
          </h3>

          <div className="space-y-3">
            {filters.sort.map((label, idx) => {
              const isSelected = currentSort === label || (!currentSort && idx === 0);

              return (
                <label
                  key={label}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="sort"
                    checked={isSelected}
                    onChange={() => onSortChange && onSortChange(label)}
                    className="hidden"
                  />

                  {/* Custom radio */}
                  <div
                    className={`relative h-5 w-5 rounded-full border-2 transition-all duration-200
            ${isSelected
                        ? "border-(--accent-color)"
                        : "border-(--divider-color) group-hover:border-(--accent-color)/60"
                      }`}
                  >
                    <div
                      className={`absolute inset-1 rounded-full bg-(--accent-color) transition-all duration-200
              ${isSelected ? "scale-100" : "scale-0"}`}
                    />
                  </div>

                  <span
                    className={`text-sm transition-colors
            ${isSelected
                        ? "text-(--primary-color) font-medium"
                        : "text-(--text-color)/80 group-hover:text-(--primary-color)"
                      }`}
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>


      </div>
    </aside>
  );
}
