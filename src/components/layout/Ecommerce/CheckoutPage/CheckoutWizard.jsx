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
        orderDetails,                                   // always a proper array
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
        invoiceNumber: "",                              // default empty string
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
        // Extract subscription plan metadata from the first cart item
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
    const { formData, updateFormData, totals, user, isAuthenticated, setOrderCompleted, orderCompleted, checkoutItems, isSubscription, checkoutType } = useCheckout();
    const [currentStep, setCurrentStep] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch payment methods from the API (sanitized, active-only, filtered for subscription)
    const {
        paymentMethods,
        loading: methodsLoading,
        error: methodsError,
    } = usePaymentMethods({ isSubscription });

    // Track selected payment method object (contains publishableKey)
    const [selectedMethod, setSelectedMethod] = useState(null);
    const hasAutoSelected = useRef(false);

    // Reset order completion status when entering checkout
    useEffect(() => {
        setOrderCompleted(false);
    }, [setOrderCompleted]);

    // Redirect to cart if the filtered checkout items are empty (only after initialization and if order is not completed)
    useEffect(() => {
        if (isInitialized && checkoutItems.length === 0 && !orderCompleted) {
            router.push("/cart");
        }
    }, [isInitialized, checkoutItems, router, orderCompleted]);

    // When methods load, auto-select the first valid one if none selected or if selected is unavailable
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

    // Get the gateway adapter for the selected method
    const gateway = useMemo(() => {
        return getAdapter(selectedMethod?.name);
    }, [selectedMethod]);

    const handleDirectComplete = async () => {
        setIsSubmitting(true);
        try {
            const payload = buildGuestOrderPayload(
                { ...formData, paymentMethod: "Cash" },
                checkoutItems,
                currency,
                totals,
                user,
                isSubscription
            );

            const response = await apiService.post("/Checkout/create-order", payload);

            if (response.success) {
                setOrderData(response.data);
                setOrderCompleted(true);
                clearCart();
                const invoiceNumber = response.data?.invoiceNumber || response.data?.orderId || response.data?.id;
                if (invoiceNumber) {
                    router.push(`/order-detail?invoiceNumber=${invoiceNumber}`);
                } else {
                    setCurrentStep(2); // Go to confirmation step
                }
            } else {
                alert(response.message || localization?.checkout_error_create_order);
            }
        } catch (error) {
            console.error("Direct completion failed:", error);
            alert(localization?.checkout_error_generic);
        } finally {
            setIsSubmitting(false);
        }
    };


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
        checkoutType,
        // New payment-specific props
        paymentMethods,
        methodsLoading,
        methodsError,
        selectedMethod,
        onMethodSelect: handleMethodSelect,
        gateway,
        // Zero-total props
        total: totals.total,
        onDirectComplete: handleDirectComplete,
        isSubmitting,
        orderData,
        formatPrice: (p) => p, // Placeholder, wrapped by useCurrency inside components or passed
        localization,
    };

    // If step is confirmation, we need to pass specific props
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
