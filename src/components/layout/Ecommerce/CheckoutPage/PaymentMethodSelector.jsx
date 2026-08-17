"use client";

import {
    FaCreditCard,
    FaPaypal,
    FaMoneyBillWave,
    FaBuildingColumns,
} from "react-icons/fa6";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * A dynamic payment method selector that renders buttons from the API data.
 *
 * Props:
 *  - paymentMethods: sanitized array from usePaymentMethods()
 *  - selectedMethod: currently selected method name
 *  - onSelect: callback(method) when a user picks a method
 *  - loading: boolean
 *  - error: string | null
 */
export default function PaymentMethodSelector({
    paymentMethods = [],
    selectedMethod,
    onSelect,
    loading,
    error,
    isSubscription = false,
}) {
    const { t } = useLanguage();

    // Converts a method display name into a translation key slug
    // e.g. "Credit Card" → "checkout.payment_method.credit_card"
    const getMethodKey = (name) => {
        if (!name) return null;
        return `checkout.payment_method.${name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}`;
    };
    // =========================================================================
    // TEMPORARY FIX: HIDE PAYPAL FOR SUBSCRIPTIONS
    // To re-enable PayPal for subscription checkouts in the future (once fixed):
    // Change `activeMethods` to: `const activeMethods = paymentMethods;`
    // =========================================================================
    const activeMethods = isSubscription
        ? paymentMethods.filter((m) => m.name?.toLowerCase() !== "paypal")
        : paymentMethods;

    // ─── Loading skeleton ─────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-divider bg-white dark:bg-white/5 animate-pulse"
                    >
                        <div className="size-12 rounded-full bg-gray-200 dark:bg-white/10" />
                        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/10" />
                    </div>
                ))}
            </div>
        );
    }

    // ─── Error state ──────────────────────────────────────────────────────
    if (error && activeMethods.length === 0) {
        return (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm font-bold">{error}</p>
            </div>
        );
    }

    // ─── Icon mapping ─────────────────────────────────────────────────────
    const getPaymentIcon = (methodName) => {
        const name = methodName?.toLowerCase() || "";

        if (name.includes("stripe")) return FaCreditCard;
        if (name.includes("paypal")) return FaPaypal;
        if (
            name.includes("cod") ||
            name.includes("cash") ||
            name.includes("delivery")
        )
            return FaMoneyBillWave;
        if (name.includes("bank") || name.includes("transfer"))
            return FaBuildingColumns;

        return FaCreditCard;
    };

    // ─── Dynamic grid columns based on number of active methods ───────────
    const gridColsClass =
        activeMethods.length === 1
            ? "grid-cols-1"
            : activeMethods.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

    // ─── Method cards ─────────────────────────────────────────────────────
    return (
        <div className={`grid ${gridColsClass} gap-4`}>
            {activeMethods.map((method) => {
                const isSelected =
                    selectedMethod?.toLowerCase() === method.name?.toLowerCase();
                const IconComponent = getPaymentIcon(method.name);

                return (
                    <FaderInAnimation key={method.id} direction="up" delay={0.05}>
                        <button
                            type="button"
                            onClick={() => onSelect(method)}
                            className={`w-full flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all group ${isSelected
                                ? "border-accent bg-accent/5 ring-4 ring-accent/10"
                                : "border-divider bg-white dark:bg-white/5 hover:border-accent/50"
                                }`}
                        >
                            <div
                                className={`size-14 rounded-full flex items-center justify-center transition-all ${isSelected
                                    ? "bg-accent text-white"
                                    : "bg-secondary text-primary group-hover:bg-accent/10 group-hover:text-accent"
                                    }`}
                            >
                                <IconComponent className="text-2xl" />
                            </div>

                            <span className="font-bold text-primary">
                                {t(getMethodKey(method.displayName || method.name), method.displayName || method.name)}
                            </span>
                        </button>
                    </FaderInAnimation>
                );
            })}
        </div>
    );
}
