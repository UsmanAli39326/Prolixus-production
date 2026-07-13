"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import useCart from "@/Hooks/useCart";
import { calcCartTotals } from "@/lib/cart";
import { getProfile } from "@/lib/ProfileService";
import { apiService } from "@/lib/api";
import { useAuth } from "./AuthContext";

const CheckoutContext = createContext();

/**
 * @param {Object} props
 * @param {"one-time"|"subscribe"} [props.checkoutType] – Purchase type filter from URL ?type=
 */
export const CheckoutProvider = ({ children, checkoutType: initialType }) => {
    const { cartItems } = useCart();
    const { user: authUser, isLoggedIn, token } = useAuth();

    // ── Checkout type awareness ─────────────────────────────────────────────
    const [checkoutType, setCheckoutType] = useState(initialType || "one-time");
    const isSubscription = checkoutType === "subscribe";

    // Filter cart items to only the type being checked out
    const checkoutItems = useMemo(() =>
        cartItems.filter(item =>
            checkoutType === "subscribe"
                ? item.purchaseType === "subscribe"
                : item.purchaseType !== "subscribe"
        ), [cartItems, checkoutType]);

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
        paymentMethod: "Stripe", // Default to Stripe as per common usage
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
                        // const balance = 50;
                        setWalletBalance(isNaN(balance) ? 0 : balance);
                    } catch {
                        // Wallet fetch is non-critical — silently default to 0
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

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    // Calculate totals from FILTERED checkout items (not all cart items)
    const totals = useMemo(() => {
        const baseTotals = calcCartTotals(checkoutItems);
        // Truncate to 2 decimal places — never round up
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
    }, [checkoutItems, formData.discountAmount, formData.useWallet, formData.walletAmount]);

    return (
        <CheckoutContext.Provider
            value={{
                formData,
                updateFormData,
                totals,
                user,
                isAuthenticated,
                walletBalance,
                orderCompleted,
                setOrderCompleted,
                // ── New type-aware values ──
                checkoutType,
                setCheckoutType,
                isSubscription,
                checkoutItems,
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
