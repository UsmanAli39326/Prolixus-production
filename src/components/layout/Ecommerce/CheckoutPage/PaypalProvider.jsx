"use client";

import { useState, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCurrency } from "@/context/CurrencyContext";
import { apiService } from "@/lib/api";

/**
 * Legacy PayPalProvider — now fetches the publishable key dynamically
 * from the payment methods API based on isTestingEnvironment.
 *
 * NOTE: The main checkout flow uses paypalGateway.js instead.
 * This file is kept for backwards compatibility.
 */
export default function PayPalProvider({ children }) {
    const { currency } = useCurrency();
    const [publishableKey, setPublishableKey] = useState(null);

    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await apiService.get("/Configuration/paymentmethods");
                const methods = Array.isArray(response)
                    ? response
                    : response?.data ?? response?.result ?? [];

                const paypalMethod = methods.find(
                    (m) => m.name?.toLowerCase() === "paypal" && m.isActive === true
                );

                if (paypalMethod) {
                    const key = paypalMethod.isTestingEnvironment
                        ? paypalMethod.testPublishablekey
                        : paypalMethod.livePublishablekey;

                    if (key) setPublishableKey(key);
                }
            } catch (err) {
                console.error("Failed to load PayPal config:", err);
            }
        };

        fetchKey();
    }, []);

    if (!publishableKey) return null;

    return (
        <PayPalScriptProvider
            options={{
                clientId: publishableKey,
                currency: currency || "EUR",
                intent: "capture",
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
}