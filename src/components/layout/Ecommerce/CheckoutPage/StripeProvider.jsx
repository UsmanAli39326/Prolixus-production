"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { apiService } from "@/lib/api";

/**
 * Legacy StripeProvider — now fetches the publishable key dynamically
 * from the payment methods API based on isTestingEnvironment.
 *
 * NOTE: The main checkout flow uses stripeGateway.js instead.
 * This file is kept for backwards compatibility.
 */
export default function StripeProvider({ children }) {
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await apiService.get("/Configuration/paymentmethods");
                const methods = Array.isArray(response)
                    ? response
                    : response?.data ?? response?.result ?? [];

                const stripeMethod = methods.find(
                    (m) => m.name?.toLowerCase() === "stripe" && m.isActive === true
                );

                if (stripeMethod) {
                    const key = stripeMethod.isTestingEnvironment
                        ? stripeMethod.testPublishablekey
                        : stripeMethod.livePublishablekey;

                    if (key) setStripePromise(loadStripe(key));
                }
            } catch (err) {
                console.error("Failed to load Stripe config:", err);
            }
        };

        fetchKey();
    }, []);

    if (!stripePromise) return null;

    return <Elements stripe={stripePromise}>{children}</Elements>;
}