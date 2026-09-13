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
export function buildGuestOrderPayload(formData, cartItems, currency = "EURO", totals = {}, user = null, isSubscription = false, extraPaymentData = {}) {
    console.log("[buildGuestOrderPayload] Generating order payload for cartItems count:", cartItems?.length);
    const r = (n) => Math.trunc((n ?? 0) * 100) / 100;

    const vatPercentage = totals.vatPercentage || 0;

    const oneTimeItems = (cartItems || []).filter((item) => item.purchaseType !== "subscribe");
    const subscriptionItems = (cartItems || []).filter((item) => item.purchaseType === "subscribe");

    const orderDetails = (cartItems || []).map((item) => {
        const rawVat = item.vatPercentage ?? 0;
        const vatDecimal = rawVat >= 1 ? rawVat / 100 : rawVat;
        const itemVatPct = vatDecimal * 100;
        const isItemSubscription = item.purchaseType === "subscribe";
        const bundleQty = item.bundleQuantity || item.bundleQty || item.subscriptionQty || 1;
        const totalItemNet = r(item.price * item.quantity);

        // Item-level discount (uses explicit item.discount or proportional share of totals.discountAmount)
        const itemDiscount = item.discount
            ? r(item.discount)
            : (totals?.subtotal > 0 && totals?.discountAmount > 0)
                ? r((totalItemNet / totals.subtotal) * totals.discountAmount)
                : 0;

        return {
            itemId: item.productId || (typeof item.id === 'string' ? parseInt(item.id.split('-')[0], 10) : item.id),
            quantity: item.quantity,
            unitPrice: r(item.price),
            vatPercentage: r(itemVatPct),
            vatAmount: r(item.price * item.quantity * vatDecimal),
            promotionPrice: r(item.price),   // same as unitPrice when no promotion
            discount: itemDiscount,
            totalNetPrice: totalItemNet,
            isSubscription: isItemSubscription,
            bundleQty: bundleQty,
        };
    });

    const createSubscriptions = subscriptionItems.map((item) => {
        const rawTier = item.variantId || item.pricingTierId || item.subscriptionPlanId || "";
        const pricingTierId = rawTier.toString().replace('sub-', '');
        return {
            productId: item.productId || (typeof item.id === 'string' ? parseInt(item.id.split('-')[0], 10) : item.id),
            pricingTierId: pricingTierId,
            quantity: item.quantity || 1,
            paymentGateway: formData.paymentMethod || "Stripe",
            paymentMethodId: extraPaymentData?.paymentMethodId || formData.paymentMethodId || null,
            currency: currency || "EUR",
            gatewayCustomerId: extraPaymentData?.gatewayCustomerId || formData.gatewayCustomerId || user?.gatewayCustomerId || null,
        };
    });

    const customerId = user?.id || null;
    const guestCustomerInfo = customerId ? null : `${formData.fullName}, ${formData.email}, ${formData.phone}`;

    const hasSub = isSubscription || subscriptionItems.length > 0;
    const primarySubItem = subscriptionItems[0];
    const rawSubTier = primarySubItem?.variantId || primarySubItem?.pricingTierId || "";
    const subscriptionPlanId = hasSub
        ? (parseInt(rawSubTier.toString().replace('sub-', ''), 10) || null)
        : null;

    const payload = {
        shopId: 1,
        customerId,
        guestCustomerInfo,
        orderDetails,
        createSubscriptions,
        couponCode: formData.couponCode?.trim() || null,
        paymentMethod: formData.paymentMethod || "Cash",
        paymentToken: extraPaymentData?.paymentToken || formData.paymentToken || null,
        grossAmount: totals.total,
        totalNetAmount: totals.subtotal,
        discountAmount: r(totals.discountAmount || 0),
        totalVatAmount: totals.vatAmount,
        vatPercentage,
        shippingChargesAmount: totals.shipping || 0,
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
        CustomerAffiliatedAmount: r(totals.walletAmount || 0),
        isSubscription: hasSub,
        subscriptionPlanId,
        subscriptionInterval: hasSub ? "monthly" : null,
    };

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

    const {
        paymentMethods,
        loading: methodsLoading,
        error: methodsError,
    } = usePaymentMethods({ isSubscription: hasSubscription });

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
    // UNIFIED ORDER SUBMISSION
    // Submits all cart items together in a single /Checkout/create-order request.
    // ---------------------------------------------------------------------------
    const handleOrderSubmit = useCallback(async (overrideFormData) => {
        const fd = overrideFormData || formData;
        setIsSubmitting(true);

        try {
            const payload = buildGuestOrderPayload(
                fd,
                checkoutItems,
                currency,
                totals,
                user,
                hasSubscription
            );

            const response = await apiService.post("/Checkout/create-order", payload);

            if (!response.success) {
                alert(response.message || localization?.checkout_error_create_order || "Failed to place order.");
                return;
            }

            const results = [{ type: hasSubscription ? "subscription" : "one-time", data: response.data }];
            setAllOrderResults(results);
            setOrderData(response.data || null);
            setOrderCompleted(true);
            clearCart();

            // Navigate to order detail for the invoice
            const firstInvoice = response.data?.invoiceNumber || response.data?.orderId || response.data?.id;
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
    }, [formData, checkoutItems, currency, totals, user, hasSubscription, clearCart, setOrderCompleted, router, localization]);

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
        buildGuestOrderPayload: (fd, ci, c, extra) => buildGuestOrderPayload(fd, ci, c, totals, user, isSubscription, extra),
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
