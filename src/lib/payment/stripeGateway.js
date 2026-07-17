"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { apiService } from "@/lib/api";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ─── Provider ────────────────────────────────────────────────────────────────
 * Updated to fetch clientSecret immediately and pass it to Elements provider.
 * This is required for automatic payment methods and the Payment Element.
 */
function StripeGatewayProvider({ publishableKey, amount, currency, isSubscription, cartItems, children }) {
    console.log("[StripeGatewayProvider] Initialized with amount:", amount, "isSubscription:", isSubscription);

    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);

    const stripePromise = useMemo(() => {
        if (!publishableKey) return null;
        return loadStripe(publishableKey);
    }, [publishableKey]);

    useEffect(() => {
        if (!amount || !currency) return;
        if (isSubscription) return; // For subscriptions, we don't fetch clientSecret upfront

        const fetchIntent = async () => {
            try {
                console.log("[StripeGatewayProvider] Fetching payment intent with amount:", amount);
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount, currency }),
                });

                const data = await res.json();
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    setError(data.error || "Failed to initialize payment.");
                }
            } catch (err) {
                console.error("Stripe initialization error:", err);
                setError("Connection to Stripe failed.");
            }
        };

        fetchIntent();
    }, [amount, currency]);

    if (error) {
        return <p className="text-red-500 text-sm p-4 bg-red-50 rounded-xl border border-red-100">{error}</p>;
    }

    if (!stripePromise) {
        return <p className="text-red-500 text-sm">Stripe publishable key missing.</p>;
    }

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#3b82f6', // matches accent color
            colorBackground: '#ffffff',
            colorText: '#2c2c2c',
            colorDanger: '#ef4444',
            fontFamily: 'inherit',
            borderRadius: '12px',
        },
        rules: {
            '.Input': {
                border: '1px solid #e5e7eb',
                padding: '14px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            },
            '.Input:focus': {
                border: '1px solid #2563eb',
                boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.1)',
            },
            '.Label': {
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#1f2937',
            },
            '.Tab': {
                border: '1px solid #e5e7eb',
                padding: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            },
            '.Tab:hover': {
                borderColor: '#3b82f6',
            },
            '.Tab--selected': {
                borderColor: '#3b82f6',
                borderWidth: '2px',
            },
            '.AccordionItem': {
                border: '1px solid #e5e7eb',
                marginBottom: '10px',
                borderRadius: '12px',
            }
        }
    };

    if (isSubscription) {
        return (
            <Elements stripe={stripePromise} options={{
                mode: 'subscription',
                amount: Math.round(amount * 100) || 100, // Stripe requires at least positive amount
                currency: (currency || 'eur').toLowerCase(),
                paymentMethodCreation: 'manual',
                appearance,
                locale: 'en',
            }}>
                {children}
            </Elements>
        );
    }

    // Show a stunning loader while fetching the clientSecret
    if (!clientSecret) {
        return (
            <div className="bg-white dark:bg-white/5 border border-divider rounded-4xl p-16 mb-8 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent animate-pulse" />
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-100 rounded-full" />
                    <div className="w-12 h-12 border-4 border-t-blue-500 rounded-full animate-spin absolute top-0" />
                </div>
                <div className="text-center relative">
                    <p className="text-xl font-black text-primary tracking-tight">Initializing Secure Checkout</p>
                    <p className="text-sm font-medium text-text/40 mt-1">Establishing encrypted connection to Stripe...</p>
                </div>
            </div>
        );
    }

    return (
        <Elements key={clientSecret} stripe={stripePromise} options={{
            clientSecret,
            appearance,
            locale: 'en',
        }}>
            {children}
        </Elements>
    );
}

function StripeCheckoutForm({
    formData,
    buildGuestOrderPayload,
    cartItems,
    currency,
    onSuccess,
    onError,
    setLoading,
    isSubscription,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        // 1. Build and store payload for redirect return
        const payload = buildGuestOrderPayload(formData, cartItems, currency);
        payload.paymentMethod = "Stripe";
        console.log("[StripeCheckoutForm] Payload generated:", JSON.stringify(payload, null, 2));
        localStorage.setItem("pendingOrderPayload", JSON.stringify(payload));

        const shippingCountry = (formData.countryCode || (currency?.toLowerCase() === 'eur' ? 'DE' : 'US')).toUpperCase();
        const billingCountry = (formData.countryCode || (currency?.toLowerCase() === 'eur' ? 'DE' : 'US')).toUpperCase();
        const stateValue = formData.state ? formData.state.toUpperCase() : (shippingCountry === 'US' ? 'CA' : undefined);

        const confirmParamsConfig = {
            shipping: {
                name: formData.fullName,
                address: {
                    line1: formData.address,
                    city: formData.city,
                    state: stateValue,
                    postal_code: formData.zip,
                    country: shippingCountry,
                },
            },
            payment_method_data: {
                billing_details: {
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        line1: formData.address,
                        city: formData.city,
                        state: stateValue,
                        postal_code: formData.zip,
                        country: billingCountry,
                    }
                }
            },
            return_url: `${window.location.origin}/checkout/status`,
        };

        try {
            if (isSubscription) {
                // Subscription flow

                // 1. Trigger form validation
                const { error: submitError } = await elements.submit();
                if (submitError) {
                    setErrorMessage(submitError.message);
                    onError(submitError.message);
                    setLoading(false);
                    return;
                }

                // 2. Create PaymentMethod
                const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                    elements,
                    params: {
                        billing_details: confirmParamsConfig.payment_method_data.billing_details,
                    }
                });

                if (pmError) {
                    setErrorMessage(pmError.message);
                    onError(pmError.message);
                    setLoading(false);
                    return;
                }

                let finalGatewayCustomerId = formData.gatewayCustomerId || null;

                // Ensure the Customer exists AND the PaymentMethod is attached to it
                const customerRes = await fetch("/api/stripe/setup-customer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        name: formData.fullName,
                        paymentMethodId: paymentMethod.id,
                        customerId: finalGatewayCustomerId // undefined if new customer
                    }),
                });

                const customerData = await customerRes.json();
                if (customerData.customerId) {
                    finalGatewayCustomerId = customerData.customerId;
                } else {
                    throw new Error(customerData.error || "Failed to setup Stripe customer");
                }

                // 3. Call Subscriptions/create
                const subPayload = {
                    productId: cartItems[0]?.productId || parseInt(cartItems[0]?.id?.toString().split('-')[0]),
                    pricingTierId: cartItems[0]?.variantId,
                    quantity: cartItems[0]?.quantity || 1,
                    paymentGateway: "Stripe",
                    paymentMethodId: paymentMethod.id,
                };

                if (finalGatewayCustomerId) {
                    subPayload.gatewayCustomerId = finalGatewayCustomerId;
                }

                const subRes = await apiService.post("/Subscriptions/create", subPayload);
                const resData = subRes.data || subRes.result || subRes;

                const clientSecret = resData.clientSecret || resData.payment?.additionalData?.ClientSecret;
                const paymentIntentId = resData.paymentIntentId || resData.payment?.additionalData?.PaymentIntentId || (clientSecret ? clientSecret.split('_secret_')[0] : null);
                const subscriptionId = resData.subscriptionId || resData.subscription?.stripeSubscriptionId || resData.subscription?.id;

                if (subRes.success === false || !resData || (!subscriptionId && !clientSecret)) {
                    setErrorMessage(subRes.message || "Failed to create subscription");
                    onError(subRes.message || "Failed to create subscription");
                    setLoading(false);
                    return;
                }

                // 4. Confirm Card Payment (for 3D Secure / SCA)
                if (clientSecret) {
                    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

                    if (confirmError) {
                        setErrorMessage(confirmError.message);
                        onError(confirmError.message);
                        setLoading(false);
                        return;
                    }

                    if (paymentIntent && paymentIntent.status === "processing") {
                        window.location.href = `${window.location.origin}/checkout/status?payment_intent_client_secret=${paymentIntent.client_secret}`;
                        return;
                    }
                }

                // 5. Finalize local order
                payload.paymentToken = paymentIntentId || subscriptionId;
                payload.subscriptionId = subscriptionId;

                const finalRes = await apiService.post("/Checkout/create-order", payload);
                if (finalRes.success) {
                    localStorage.removeItem("pendingOrderPayload");
                    onSuccess(finalRes.data);
                } else {
                    setErrorMessage(finalRes.message);
                    onError(finalRes.message);
                }

            } else {
                // One-time payment
                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    confirmParams: confirmParamsConfig,
                    redirect: "if_required",
                });

                if (error) {
                    setErrorMessage(error.message);
                    onError(error.message);
                } else if (paymentIntent) {
                    if (paymentIntent.status === "succeeded") {
                        payload.paymentToken = paymentIntent.id;
                        const response = await apiService.post("/Checkout/create-order", payload);

                        if (response.success) {
                            localStorage.removeItem("pendingOrderPayload");
                            onSuccess(response.data);
                        } else {
                            setErrorMessage(response.message);
                            onError(response.message);
                        }
                    } else if (paymentIntent.status === "processing") {
                        window.location.href = `${window.location.origin}/checkout/status?payment_intent_client_secret=${paymentIntent.client_secret}`;
                    }
                }
            }
        } catch (err) {
            console.error("Stripe handlePayment error:", err);
            setErrorMessage("An unexpected error occurred. Please try again.");
            onError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return {
        handlePayment,
        ui: (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white mt-8 dark:bg-white/5 border border-divider rounded-4xl p-8 mb-10 shadow-2xl shadow-blue-500/5 relative overflow-hidden group"
            >
                {/* Subtle Gradient Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 rounded-full group-hover:bg-blue-500/10 transition-colors" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <p className="text-2xl font-black text-primary tracking-tight">Checkout</p>
                        <p className="text-sm text-text/50 font-medium font-accent">Select your preferred payment method</p>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-full border border-divider">
                        <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg shadow-sm">
                            <FaCcVisa className="text-[#1A1F71] text-2xl" />
                            <FaCcMastercard className="text-[#EB001B] text-2xl" />
                            <FaCcAmex className="text-[#0070d1] text-2xl" />
                        </div>
                        <span className="text-[10px] font-bold text-text/40 uppercase tracking-widest leading-none">Secure Payments</span>
                    </div>
                </div>

                <PaymentElement options={{
                    layout: {
                        type: 'tabs',
                        defaultCollapsed: false,
                        radios: true,
                        spacedAccelerator: true,
                    },
                    fields: {
                        billingDetails: {
                            name: 'auto',
                        }
                    }
                }} />

                {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl">
                        {errorMessage}
                    </div>
                )}

                <p className="text-[11px] text-text/40 font-medium text-center uppercase tracking-widest">
                    Encrypted and processed by Stripe
                </p>
            </motion.div>
        ),
    };
}


/**
 * ─── Wrapper ─────────────────────────────────────────────────────────────────
 */
function StripeCheckoutComponent(props) {
    const { handlePayment, ui } = StripeCheckoutForm(props);

    useEffect(() => {
        if (props.onReady) {
            props.onReady(handlePayment);
        }
    }, [handlePayment, props]);

    return ui;
}


/**
 * ─── Export Adapter ──────────────────────────────────────────────────────────
 */
const stripeGateway = {
    name: "Stripe",
    ProviderComponent: StripeGatewayProvider,
    CheckoutComponent: StripeCheckoutComponent,
};

export default stripeGateway;