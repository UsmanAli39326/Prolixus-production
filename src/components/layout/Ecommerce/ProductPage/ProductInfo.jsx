"use client";

import React from "react";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";

/**
 * Star Rating Display
 */
function StarRating({ rating = 0, reviewCount = 0 }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={`text-base ${i < fullStars
                            ? "text-(--accent-color)"
                            : i === fullStars && hasHalfStar
                                ? "text-(--accent-color)/60"
                                : "text-(--accent-color)/25"
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <span className="text-sm text-(--text-color)">
                {reviewCount} Reviews
            </span>
        </div>
    );
}

/**
 * ProductInfo Component
 * 
 * Displays product details including breadcrumbs, badges, title, 
 * price, and rating.
 */
export default function ProductInfo({
    category = "Skincare",
    subcategory = "Face Oils",
    title = "Product Title",
    price = 0,
    originalPrice = null,
    rating = 0,
    reviewCount = 0,
    badges = [],
    localization,
}) {
    const { formatPrice } = useCurrency();
    return (
        <div className="flex flex-col gap-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-sm text-(--text-color)/70">
                <ol className="flex items-center gap-2">
                    <li>
                        <Link href="/products" className="hover:text-(--accent-color) transition-colors">
                            {localization?.product_breadcrumb_home}
                        </Link>
                    </li>
                    <li className="text-(--divider-color)">/</li>
                    <li>
                        <Link href="/products" className="hover:text-(--accent-color) transition-colors">
                            {category}
                        </Link>
                    </li>
                    <li className="text-(--divider-color)">/</li>
                    <li className="text-(--primary-color) font-medium">{subcategory}</li>
                </ol>
            </nav>

            {/* Badges */}
            {badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {badges.map((badge, index) => (
                        <span
                            key={index}
                            className={`
                inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide
                ${badge.type === "sale"
                                    ? "bg-(--error-color) text-(--white-color)"
                                    : "bg-(--primary-color) text-(--secondary-color)"
                                }
              `}
                        >
                            {badge.label}
                        </span>
                    ))}
                </div>
            )}

            {/* Title */}
            <h1 className="font-accent text-3xl font-semibold leading-tight text-(--primary-color) md:text-4xl">
                {title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-(--primary-color)">
                    {formatPrice(price)}
                </span>
                {originalPrice && originalPrice > price && (
                    <span className="text-lg text-(--text-color)/50 line-through">
                        {formatPrice(originalPrice)}
                    </span>
                )}
            </div>

            {/* Rating */}
            {/* <StarRating rating={rating} reviewCount={reviewCount} /> */}

            <div className="flex items-center gap-2 text-sm text-(--text-color)">
                {reviewCount} {localization?.product_reviews_count}
            </div>

        </div>
    );
}
