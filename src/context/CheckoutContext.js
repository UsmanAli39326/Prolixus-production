"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import useCart from "@/Hooks/useCart";
import { calcCartTotals } from "@/lib/cart";
import { getProfile } from "@/lib/ProfileService";
import { apiService } from "@/lib/api";
import { useAuth } from "./AuthContext";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const { cartItems } = useCart();
    const { user: authUser, isLoggedIn, token } = useAuth();

    // ── Split items by purchase type ────────────────────────────────────────
    const oneTimeItems = useMemo(
        () => cartItems.filter((item) => item.purchaseType !== "subscribe"),
        [cartItems]
    );
    const subscriptionItems = useMemo(
        () => cartItems.filter((item) => item.purchaseType === "subscribe"),
        [cartItems]
    );
    const hasOneTime = oneTimeItems.length > 0;
    const hasSubscription = subscriptionItems.length > 0;

    // All cart items go to checkout — no type filtering
    const checkoutItems = cartItems;

    // Legacy: isSubscription = true only when cart is purely subscriptions
    const isSubscription = hasSubscription && !hasOneTime;

    // ── User & auth state ───────────────────────────────────────────────────
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [orderCompleted, setOrderCompleted] = useState(false);

    const [formData, setFormData] = useState({
        // Contact
        email: "",
        fullName: "",
        phone: "",

        // Shipping address
        address: "",
        apartment: "",
        city: "",
        zip: "",
        countryId: 1,
        countryCode: "",

        // Payment & metadata
        paymentMethod: "Stripe",
        paymentToken: null,
        couponCode: "",
        orderNotes: "",
        gatewayCustomerId: null,

        // Optional extras
        affiliateCustomerCode: "",
        discountAmount: 0,

        // Wallet
        useWallet: false,
        walletAmount: 0,
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (token) {
                try {
                    const response = await getProfile();
                    if (response?.success && response.data) {
                        setUser(response.data);
                        setIsAuthenticated(true);

                        // Prefill form if data is available
                        setFormData(prev => ({
                            ...prev,
                            email: response.data.email || prev.email,
                            fullName: response.data.name || prev.fullName,
                            phone: response.data.mobile || prev.phone,
                            address: response.data.shippingStreet || prev.address,
                            city: response.data.shippingCity || prev.city,
                            zip: response.data.shippingPostCode || prev.zip,
                            countryId: response.data.shippingCountryId || prev.countryId,
                            countryCode: response.data.shippingCountryCode || prev.countryCode,
                            gatewayCustomerId: response.data.gatewayCustomerId || response.data.stripeCustomerId || prev.gatewayCustomerId || null,
                        }));
                    }

                    // Fetch wallet balance from dedicated endpoint
                    try {
                        const walletRes = await apiService.get("/Dashboard/customer-wallet");
                        const balance = parseFloat(walletRes?.data?.remainingAffiliateAmount ?? 0);
                        setWalletBalance(isNaN(balance) ? 0 : balance);
                    } catch {
                        setWalletBalance(0);
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile in CheckoutContext:", error);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        fetchUserProfile();
    }, [token]);

    const updateFormData = useCallback((newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    }, []);

    // ── Helper: apply discount & wallet to a base totals object ────────────
    const applyDeductions = useCallback((baseTotals) => {
        const t = (n) => Math.trunc((n ?? 0) * 100) / 100;
        const discountAmount = t(formData.discountAmount || 0);
        const afterDiscount = t(Math.max(0, baseTotals.total - discountAmount));
        const walletAmount = formData.useWallet ? t(Math.min(formData.walletAmount, afterDiscount)) : 0;
        return {
            ...baseTotals,
            discountAmount,
            walletAmount,
            total: t(Math.max(0, afterDiscount - walletAmount)),
        };
    }, [formData.discountAmount, formData.useWallet, formData.walletAmount]);

    // ── Combined totals (used for order summary display) ───────────────────
    const totals = useMemo(() => {
        return applyDeductions(calcCartTotals(checkoutItems));
    }, [checkoutItems, applyDeductions]);

    // ── Per-type totals (for split display in OrderSummary & checkout) ─────
    const oneTimeTotals = useMemo(() => calcCartTotals(oneTimeItems), [oneTimeItems]);
    const subscriptionTotals = useMemo(() => calcCartTotals(subscriptionItems), [subscriptionItems]);

    return (
        <CheckoutContext.Provider
            value={{
                formData,
                updateFormData,
                totals,
                oneTimeTotals,
                subscriptionTotals,
                user,
                isAuthenticated,
                walletBalance,
                orderCompleted,
                setOrderCompleted,
                // ── Type-aware values ──
                checkoutItems,
                oneTimeItems,
                subscriptionItems,
                hasOneTime,
                hasSubscription,
                isSubscription,
                // Legacy compat (kept for PaymentMethodSelector / PaymentForm)
                checkoutType: isSubscription ? "subscribe" : "one-time",
                setCheckoutType: () => {},
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
};
