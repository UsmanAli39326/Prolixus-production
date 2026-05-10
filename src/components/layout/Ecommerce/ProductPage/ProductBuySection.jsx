"use client";

import { useState } from "react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { QuantitySelector } from "./index";

export default function ProductBuySection({ product, localization }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 mb-4 flex gap-4">
      <QuantitySelector
        initialQuantity={1}
        onChange={(val) => setQuantity(val)}
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        size="page"
        localization={localization}
      />
    </div>
  );
}
