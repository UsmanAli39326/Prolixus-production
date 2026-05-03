"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";

/**
 * Star Rating Component
 */
function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`text-xs ${i < rating ? "text-(--accent-color)" : "text-(--accent-color)/25"
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

/**
 * RelatedProductCard Component
 */
function RelatedProductCard({ product }) {
    const { formatPrice } = useCurrency();
    return (
        <Link
            href={`/products/${product.id}`}
            className="
        group flex flex-col overflow-hidden
        rounded-2xl border border-(--divider-color)
        bg-(--white-color) shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        min-w-[200px] sm:min-w-[240px]
      "
        >
            <div className="relative aspect-square overflow-hidden bg-(--secondary-color)">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    unoptimized={true}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-(--primary-color) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-(--secondary-color)">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="flex flex-col p-4">
                <h3 className="font-accent text-sm font-semibold leading-snug text-(--primary-color) line-clamp-2">
                    {product.title}
                </h3>
                <div className="mt-1.5">
                    {/* <StarRating rating={product.rating || 0} /> */}
                </div>
                <div className="mt-2 text-base font-bold text-(--primary-color)">
                    {formatPrice(product.price)}
                </div>
            </div>
        </Link>
    );
}

/**
 * RelatedProducts Component
 * 
 * Horizontal scrollable section displaying related products.
 * "Complete Your Ritual" section with view all link.
 */
export default function RelatedProducts({
    title = "Complete Your Ritual",
    products = [],
    viewAllLink = "/products",
}) {
    // Default sample products if none provided
    const defaultProducts = [
        {
            id: "p1",
            title: "Purifying Clay Cleanser",
            price: 38,
            rating: 5,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA2yu7TAIqenWHxD18FcULeyMTThH6gLTL0AVUPHMBx55f0BIurztolZfxUBa-Cziubaaf2eHt0guo2p51v1KI8k-9lgDHNj52iFo8wlhw6-PSBhR-Jqf84M7mL66J4_U4vpSOZnWmt0xUbF3wketY5p649nO9sQvZMke3WvpK_atDHCypsX5wj0bSZsAwzBBVjv5CLqDBaL1uGH7owbNyKh109bLqvGXC1hM37jm12WhleTqFiFqBU3iBK45PQabyXeLwwkL70xM",
        },
        {
            id: "p2",
            title: "Hydrating Floral Mist",
            price: 32,
            rating: 4,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0XPFFJ5iVCnllkP3HzMhy6S9jFSpf5aP8n3hRzpfOvBxZjErHXfkjamPrx60-7dZoQmozaODftjqKonhoo4cNMkWz0Csnyg5641p42rTS7WAh2CYUZBtyGpx7i_vESyvEDyBxc6uI1RCjakkfAZtUFE0irKKbkNp7eGCMbtWEPY2uh2RUVWkPGoneDSt3JfTaCNHGFqwAV2tFomIlOqC0JryOzCo1MDWhKjom3836KQRQZ7r1r5PWWyxKMWP1xq6r8kUgLzU24LM",
        },
        {
            id: "p3",
            title: "Restorative Night Cream",
            price: 78,
            rating: 5,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-FtVe_GoVTOiSWkEpoIGwy94DlYB5w3zW_MnOS11L_IMEFienZyiY73uvSpm9SIjhYmLOFp_SBwouQvB4xihA5rtBAotlIy7Wv-Epmv9FQd84pL7YMc_hq1o5PBXf1HwJ1nU6X7YBXvoJzCMX1RMehLpqyl0mKPaiOOv9bvW0ETCm4ylE5yZGiT_VahWFW8vPzRxIF2EQOQG2COl8AdAklRnFt2p-T2bKQrZ58NHQzarlw2zqQ5aTwW29qoRjJJe51LMlII-QUVQ",
        },
        {
            id: "p4",
            title: "Vitamin C Serum",
            price: 55,
            rating: 4,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABdzQ3kof6jI5wHeIDYDH1qYZBEWxFLSP2VPC8AXzyjMKIeqWR0cz-CeTcfiuhWTAEQPZQ-Oi8b3EK1NRLmZs10vtWEVqiLhuMasndrWZnhwVZr_4E4UTtjQhrFtG470gx5RvktIF2OPIdEscjPMuNGEstlEJXllcMMuWCuZ1M-a0xXsO2q7dMX7SC6qOZdm3-gCrPdbFyEGxAJSudU85n7FU-jmwbABSxtuLTb4USpLqKp1xDsT9XyO7yntSZlaC0E11A0fMwT4A",
        },
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;

    return (
        <section className="py-16">
            <div className="flex items-center justify-between">
                <h2 className="font-accent text-2xl font-semibold text-(--primary-color) md:text-3xl">
                    {title}
                </h2>
                <Link
                    href={viewAllLink}
                    className="
            flex items-center gap-1 text-sm font-medium text-(--accent-color)
            transition-colors hover:text-(--primary-color)
          "
                >
                    View all collection
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="mt-8 -mx-4 px-4 overflow-x-auto pb-4">
                <div className="flex gap-4">
                    {displayProducts.map((product) => (
                        <RelatedProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
