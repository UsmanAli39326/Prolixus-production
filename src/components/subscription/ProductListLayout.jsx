"use client";

import React, { useState } from "react";
import ProductVariantBlock from "./ProductVariantBlock";

export default function ProductListLayout({ products }) {
  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className="w-full">
      {/* View Toggle */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2 bg-(--white-color) p-1 rounded-lg border border-(--divider-color) shadow-sm">
          <button
            onClick={() => setIsGrid(false)}
            className={`p-2 px-3 rounded text-sm transition-all ${
              !isGrid
                ? "bg-(--secondary-color) text-(--accent-color) font-semibold"
                : "text-(--primary-color) hover:bg-gray-100"
            }`}
            aria-label="List View"
          >
            <i className="fa-solid fa-list-ul mr-2"></i>List
          </button>
          <button
            onClick={() => setIsGrid(true)}
            className={`p-2 px-3 rounded text-sm transition-all ${
              isGrid
                ? "bg-(--secondary-color) text-(--accent-color) font-semibold"
                : "text-(--primary-color) hover:bg-gray-100"
            }`}
            aria-label="Grid View"
          >
            <i className="fa-solid fa-border-all mr-2"></i>Grid
          </button>
        </div>
      </div>

      {/* Products Layout */}
      <div
        className={
          isGrid
            ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
            : "flex flex-col gap-16"
        }
      >
        {products.map((product) => (
          <ProductVariantBlock key={product.id} product={product} isGrid={isGrid} />
        ))}
      </div>
    </div>
  );
}
