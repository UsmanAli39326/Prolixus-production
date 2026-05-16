"use client";

import { useState, useEffect, useRef } from "react";
import { apiService } from "@/lib/api";
import { getAdapter } from "@/lib/payment/gatewayRegistry";

/**
 * Sanitizes the raw API response by:
 * 1. Removing secret keys entirely
 * 2. Filtering to active-only methods
 * 3. Extracting the correct publishable key based on environment
 */
function sanitizePaymentMethods(rawMethods) {
    if (!Array.isArray(rawMethods)) return [];

    return rawMethods
        .filter((method) => method.isActive === true)
        .map((method) => {
            // Extract the correct publishable key BEFORE discarding raw data
            const publishableKey = method.isTestingEnvironment
                ? method.testPublishablekey
                : method.livePublishablekey;

            // Return ONLY safe, sanitized fields — secret keys are never stored
            return {
                id: method.id,
                name: method.name,
                displayName: method.displayName,
                imageUrl: "https://admin.aa-consultants.de/" + method.imageUrl,
                publishableKey: publishableKey || null,
                isTestingEnvironment: method.isTestingEnvironment ?? false,
            };
        });
}

/**
 * Hook to fetch payment methods from the API.
 *
 * Returns sanitized methods with secret keys stripped.
 * Keys exist only in React state — never in localStorage, sessionStorage, or cookies.
 */
export default function usePaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    useEffect(() => {
        // Prevent double-fetch in React StrictMode
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchMethods = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await apiService.get("/Configuration/paymentmethods");

                // The API may return { data: [...] } or the array directly
                const rawMethods = Array.isArray(response)
                    ? response
                    : response?.data ?? response?.result ?? [];

                const sanitized = sanitizePaymentMethods(rawMethods)
                    .filter((m) => getAdapter(m.name).name !== "Unsupported");

                if (sanitized.length === 0) {
                    setError("No active payment methods available.");
                }

                setPaymentMethods(sanitized);
            } catch (err) {
                console.error("Failed to fetch payment methods:", err);
                setError("Failed to load payment methods. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMethods();
    }, []);

    return { paymentMethods, loading, error };
}
