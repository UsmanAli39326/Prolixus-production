"use client";

import React from "react";
import Image from "next/image";

/**
 * ProductHeroImage Component
 * 
 * Large lifestyle/hero image section for visual impact.
 * Displays a full-width premium product photography.
 */
export default function ProductHeroImage({
    src,
    alt = "Product lifestyle image",
    aspectRatio = "16/9",
}) {
    if (!src) {
        return null;
    }

    return (
        <section className="my-8 w-full flex justify-center px-4">
            <div
                className="relative overflow-hidden rounded-2xl bg-(--secondary-color) w-full max-w-[1200px] max-h-[500px]"
                style={{ aspectRatio }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={500}
                    unoptimized={true}
                    className="h-full w-full object-cover"
                />
            </div>
        </section>
    );
}
