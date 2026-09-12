"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/Hooks/useCart";
import usePaymentMethods from "@/Hooks/usePaymentMethods";
import OrderForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";
import OrderConfirmation from "./OrderConfirmation";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckout } from "@/context/CheckoutContext";
import { getAdapter } from "@/lib/payment/gatewayRegistry";
import { apiService } from "@/lib/api";

// ---------------------------------------------------------------------------
// PAYLOAD BUILDER
// Pure function — no React dependency, easy to unit-test independently.
// Converts the cart state + checkout formData into the exact guest-order
// payload required by the backend API contract.
// ---------------------------------------------------------------------------
export function buildGuestOrderPayload(formData, cartItems, currency = "EURO", totals = {}, user = null, isSubscription = false) {

    console.log("payload")
    // Helper: round a number to 2 decimal places
    // Truncate to 2 decimal places — never round up
    const r = (n) => Math.trunc((n ?? 0) * 100) / 100;

    // ── orderDetails ────────────────────────────────────────────────────────
    const vatPercentage = totals.vatPercentage || 0;

    const orderDetails = cartItems.map((item) => {
        // Normalize: if value >= 1 it's already a %, otherwise convert decimal to %
        const rawVat = item.vatPercentage ?? 0;
        const vatDecimal = rawVat >= 1 ? rawVat / 100 : rawVat;
        const itemVatPct = vatDecimal * 100;
        return {
            itemId: item.productId || (typeof item.id === 'string' ? parseInt(item.id.split('-')[0], 10) : item.id),
            quantity: item.quantity,
            unitPrice: r(item.price),
            vatPercentage: r(itemVatPct),
            vatAmount: r(item.price * item.quantity * vatDecimal),
            promotionPrice: r(item.price),   // same as unitPrice when no promotion
            discount: 0,
            totalNetPrice: r(item.price * item.quantity),
        };
    });

    // ── Guest customer string ───────────────────────────────────────────────
    // If we have a user.id, we send customerId instead of guestCustomerInfo
    const customerId = user?.id || null;
    const guestCustomerInfo = customerId ? null : `${formData.fullName}, ${formData.email}, ${formData.phone}`;

    // ── Base payload ────────────────────────────────────────────────────────
    const payload = {
        shopId: 1,
        customerId,
        guestCustomerInfo,
        orderDetails,
        couponCode: formData.couponCode?.trim() || null,
        paymentMethod: formData.paymentMethod || "Cash",
        paymentToken: formData.paymentToken ?? null,
        grossAmount: totals.total,
        totalNetAmount: totals.subtotal,
        discountAmount: r(totals.discountAmount || 0),
        totalVatAmount: totals.vatAmount,
        vatPercentage,
        shippingChargesAmount: totals.shipping,
        shippingChargesPercentage: 0,
        servicesChargesAmount: 0,
        servicesChargesPercentage: 0,
        currency,
        invoiceNumber: "",
        description: formData.orderNotes || "",
        deliveryPostCode: formData.zip || "",
        deliveryCity: formData.city || "",
        deliveryStreet: formData.address || "",
        deliveryCountryId: parseInt(formData.countryId) || 1,
        addMoreAddress: formData.apartment || "",
        affiliateCustomerCode: formData.affiliateCustomerCode || "",
        CustomerAffiliatedAmount: r(totals.walletAmount),
    };

    // ── Subscription-specific fields ────────────────────────────────────────
    if (isSubscription) {
        payload.isSubscription = true;
        const subItem = cartItems[0];
        if (subItem) {
            payload.subscriptionPlanId = subItem.variantId || null;
            payload.subscriptionInterval = "monthly";
        }
    }

    return payload;
}

// ---------------------------------------------------------------------------
// WIZARD
// ---------------------------------------------------------------------------
export default function CheckoutWizard({ localization }) {
    const router = useRouter();
    const { cartItems, isInitialized, clearCart } = useCart();
    const { currency, formatPrice } = useCurrency();
    const {
        formData, updateFormData, totals,
        oneTimeTotals, subscriptionTotals,
        user, isAuthenticated, setOrderCompleted, orderCompleted,
        checkoutItems, oneTimeItems, subscriptionItems,
        hasOneTime, hasSubscription, isSubscription,
    } = useCheckout();

    const [currentStep, setCurrentStep] = useState(0);
    const [orderData, setOrderData] = useState(null);        // first completed order
    const [allOrderResults, setAllOrderResults] = useState([]); // all completed orders
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch payment methods — use subscription flag based on cart composition
    const {
        paymentMethods,
        loading: methodsLoading,
        error: methodsError,
    } = usePaymentMethods({ isSubscription });

    const [selectedMethod, setSelectedMethod] = useState(null);
    const hasAutoSelected = useRef(false);

    // Reset order completion status when entering checkout
    useEffect(() => {
        setOrderCompleted(false);
    }, [setOrderCompleted]);

    // Redirect to cart if no items (only after initialization and if order is not completed)
    useEffect(() => {
        if (isInitialized && checkoutItems.length === 0 && !orderCompleted) {
            router.push("/cart");
        }
    }, [isInitialized, checkoutItems, router, orderCompleted]);

    // Auto-select first payment method
    useEffect(() => {
        if (paymentMethods.length > 0) {
            const isCurrentValid = selectedMethod && paymentMethods.some((m) => m.name?.toLowerCase() === selectedMethod.name?.toLowerCase());
            if (!hasAutoSelected.current || !isCurrentValid) {
                const defaultMethod = paymentMethods[0];
                setSelectedMethod(defaultMethod);
                updateFormData({ paymentMethod: defaultMethod.name });
                hasAutoSelected.current = true;
            }
        }
    }, [paymentMethods, selectedMethod, updateFormData]);

    const handleMethodSelect = useCallback(
        (method) => {
            setSelectedMethod(method);
            updateFormData({ paymentMethod: method.name });
        },
        [updateFormData]
    );

    const gateway = useMemo(() => {
        return getAdapter(selectedMethod?.name);
    }, [selectedMethod]);

    // ---------------------------------------------------------------------------
    // SEQUENTIAL ORDER SUBMISSION
    // Submits one-time order first (if present), then subscription order (if present).
    // On any failure, stops and reports which order failed — cart is NOT cleared.
    // ---------------------------------------------------------------------------
    const handleOrderSubmit = useCallback(async (overrideFormData) => {
        const fd = overrideFormData || formData;
        setIsSubmitting(true);
        const results = [];

        try {
            // ── 1. One-time order ────────────────────────────────────────────
            if (hasOneTime && oneTimeItems.length > 0) {
                const payload = buildGuestOrderPayload(
                    fd,
                    oneTimeItems,
                    currency,
                    oneTimeTotals,
                    user,
                    false // not a subscription
                );

                const response = await apiService.post("/Checkout/create-order", payload);

                if (!response.success) {
                    alert(response.message || localization?.checkout_error_create_order || "Failed to place one-time order.");
                    return;
                }
                results.push({ type: "one-time", data: response.data });
            }

            // ── 2. Subscription order ────────────────────────────────────────
            if (hasSubscription && subscriptionItems.length > 0) {
                const payload = buildGuestOrderPayload(
                    fd,
                    subscriptionItems,
                    currency,
                    subscriptionTotals,
                    user,
                    true // is a subscription
                );

                const response = await apiService.post("/Checkout/create-order", payload);

                if (!response.success) {
                    // One-time order already placed — note this in the error
                    const prefix = results.length > 0
                        ? "Your one-time order was placed, but the "
                        : "";
                    alert(`${prefix}${response.message || localization?.checkout_error_create_order || "Failed to place subscription order."}`);
                    // Partial success: clear only if one-time succeeded
                    if (results.length > 0) {
                        clearCart();
                        setOrderCompleted(true);
                    }
                    return;
                }
                results.push({ type: "subscription", data: response.data });
            }

            // ── 3. All orders succeeded ──────────────────────────────────────
            setAllOrderResults(results);
            setOrderData(results[0]?.data || null);
            setOrderCompleted(true);
            clearCart();

            // Navigate to order detail for the first invoice
            const firstInvoice = results[0]?.data?.invoiceNumber || results[0]?.data?.orderId || results[0]?.data?.id;
            if (firstInvoice) {
                router.push(`/order-detail?invoiceNumber=${firstInvoice}`);
            } else {
                setCurrentStep(2); // Fallback to in-page confirmation
            }
        } catch (error) {
            console.error("Order submission failed:", error);
            alert(localization?.checkout_error_generic || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, hasOneTime, hasSubscription, oneTimeItems, subscriptionItems, currency, oneTimeTotals, subscriptionTotals, user, clearCart, setOrderCompleted, router, localization]);

    // Zero-total shortcut (wallet covers everything) — still uses sequential logic
    const handleDirectComplete = useCallback(async () => {
        await handleOrderSubmit({ ...formData, paymentMethod: "Cash" });
    }, [formData, handleOrderSubmit]);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const goToStep = (step) => setCurrentStep(step);

    const steps = [
        { name: localization?.checkout_breadcrumb_info, component: OrderForm },
        { name: localization?.checkout_breadcrumb_payment, component: PaymentForm },
        { name: localization?.checkout_confirm_title, component: OrderConfirmation },
    ];

    const CurrentFormComponent = steps[currentStep].component;

    const formProps = {
        nextStep,
        prevStep,
        goToStep,
        currentStep,
        formData,
        updateFormData,
        buildGuestOrderPayload: (fd, ci, c) => buildGuestOrderPayload(fd, ci, c, totals, user, isSubscription),
        cartItems: checkoutItems,
        user,
        isAuthenticated,
        isSubscription,
        hasSubscription,
        hasOneTime,
        checkoutType: isSubscription ? "subscribe" : "one-time",
        // Payment props
        paymentMethods,
        methodsLoading,
        methodsError,
        selectedMethod,
        onMethodSelect: handleMethodSelect,
        gateway,
        // Submit
        total: totals.total,
        onDirectComplete: handleDirectComplete,
        onSubmitOrders: handleOrderSubmit,
        isSubmitting,
        orderData,
        allOrderResults,
        formatPrice: (p) => p,
        localization,
    };

    // If step is confirmation, render inline confirmation
    if (currentStep === 2) {
        return (
            <OrderConfirmation
                orderData={orderData}
                formatPrice={formatPrice}
                isLoggedIn={isAuthenticated}
                formData={formData}
                totals={totals}
            />
        );
    }

    return <CurrentFormComponent {...formProps} />;
}
