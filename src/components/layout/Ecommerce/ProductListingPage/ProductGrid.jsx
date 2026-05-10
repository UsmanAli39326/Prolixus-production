import React from "react";
import ProductCard from "./ProductCard";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function ProductGrid({ products = [], columns = 3, localization }) {
  const gridCols = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        sm:grid-cols-2 sm:gap-5
        ${gridCols} lg:gap-6
        items-start
      `}
    >
      {products.map((p, idx) => (
        <FaderInAnimation
          key={p.id}
          direction="up"
          duration={0.5}
          distance={16}
          delay={Math.min(idx * 0.05, 0.25)}
        >
          <ProductCard key={p.id} product={p} localization={localization} />
        </FaderInAnimation>
      ))}
    </div>
  );
}
