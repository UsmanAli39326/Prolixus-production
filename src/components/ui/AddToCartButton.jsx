"use client";

import { useState } from "react";
import useCart from "@/Hooks/useCart";
import Button from "@/components/ui/Button";

/**
 * AddToCartButton
 *
 * Self-contained, reusable button that adds a product to the cart.
 * Built on top of the shared <Button> component.
 *
 * Props:
 *  product   – product object passed to addToCart()
 *  quantity  – units to add (default: 1)
 *  size      – "card" (medium) | "page" (large)
 *  className – extra classes forwarded to Button
 *  onAdded   – optional callback fired after item is added
 */
export default function AddToCartButton({
    product,
    quantity = 1,
    size = "card",
    className = "",
    onAdded,
    localization
}) {
    const { addToCart } = useCart();
    const [status, setStatus] = useState("idle"); // "idle" | "adding" | "added"

    const handleClick = (e) => {
        // prevent card <Link> from navigating when used inside ProductCard
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (status !== "idle") return;

        setStatus("adding");
        addToCart(product, quantity);

        // brief spinner → success → back to idle
        setTimeout(() => setStatus("added"), 600);
        setTimeout(() => {
            setStatus("idle");
            onAdded?.();
        }, 2000);
    };

    const isAdding = status === "adding";
    const isAdded = status === "added";

    // Map our size tokens to Button's size prop
    const buttonSize = size === "page" ? "lg" : "md";

    // Icon shown in leftIcon slot (hidden while spinner is active)
    const icon = isAdded
        ? <CheckIcon className="h-4 w-4" />
        : <CartIcon className="h-4 w-4" />;

    return (
        <Button
            variant="accent"
            size={buttonSize}
            onClick={handleClick}
            // disable pointer-events during the spinner phase only;
            // in "added" phase we keep it visually enabled (guard in handleClick)
            disabled={isAdding}
            loading={isAdding}
            leftIcon={!isAdding ? icon : null}
            className={[
                "transition-all duration-300",
                isAdded ? "bg-emerald-500! hover:bg-emerald-500! cursor-default" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {isAdded ? (localization?.product_added_to_cart || "Added!") : (localization?.product_add_to_cart || "Add to Cart")}
        </Button>
    );
}

/* ── inline SVG icons ───────────────────────────────────────── */

function CartIcon({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}

function CheckIcon({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
