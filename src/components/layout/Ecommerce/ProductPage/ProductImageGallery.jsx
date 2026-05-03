"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * ProductImageGallery Component
 * 
 * Displays product images with main image and thumbnail navigation.
 * Features smooth transitions and hover zoom effect.
 */
export default function ProductImageGallery({ images = [], productTitle = "" }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Fallback if no images provided
    const displayImages = images.length > 0 ? images : ["/images/product-image-1.png"];
    const mainImage = displayImages[selectedIndex];

    return (
        <div className="flex flex-col gap-4 max-w-[550px]">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-(--secondary-color) max-h-[550px]">
                <Image
                    src={mainImage}
                    alt={productTitle}
                    width={800}
                    height={800}
                    unoptimized={true}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Thumbnail Strip */}
            {displayImages.length > 1 && (
                <div className="flex gap-3">
                    {displayImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`
                relative aspect-square w-20 overflow-hidden rounded-lg
                border-2 transition-all duration-200
                ${selectedIndex === index
                                    ? "border-(--accent-color) ring-2 ring-(--accent-color)/30"
                                    : "border-(--divider-color) hover:border-(--primary-color)/50"
                                }
              `}
                            aria-label={`View image ${index + 1}`}
                            aria-current={selectedIndex === index ? "true" : "false"}
                        >
                            <Image
                                src={img}
                                alt={`${productTitle} - view ${index + 1}`}
                                width={150}
                                height={150}
                                unoptimized={true}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
