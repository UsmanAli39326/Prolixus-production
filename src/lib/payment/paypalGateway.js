"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { apiService } from "@/lib/api";
import { useRef } from "react";

// ─── Provider ─────────────────────────────────────────────────────────────────
function PayPalGatewayProvider({ publishableKey, currency, isSubscription, children }) {
    if (!publishableKey) {
        return <p className="text-red-500 text-sm">PayPal configuration is missing.</p>;
    }

    const options = {
        clientId: publishableKey,
        currency: currency || "EUR",
        intent: isSubscription ? "subscription" : "capture",
    };

    if (isSubscription) {
        options.vault = true;
    }

    return (
        <PayPalScriptProvider options={options}>
            {children}
        </PayPalScriptProvider>
    );
}

// ─── Checkout Form ────────────────────────────────────────────────────────────
function PayPalCheckoutComponent({
    formData,
    buildGuestOrderPayload,
    cartItems,
    currency,
    onSuccess,
    onError,
    isSubscription,
}) {
    const baTokenRef = useRef(null);

    return (
        <div className="bg-surface border border-divider rounded-2xl p-6 my-6">
            <p className="text-primary font-bold mb-4">Pay with PayPal</p>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={!isSubscription ? (data, actions) => {
                    const payload = buildGuestOrderPayload(formData, cartItems, currency);
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: payload.grossAmount.toString(),
                                },
                            },
                        ],
                    });
                } : undefined}
                createSubscription={isSubscription ? async (data, actions) => {
                    try {
                        // 1. Generate PayPal Plan ID dynamically
                        const planPayload = {
                            name: cartItems[0]?.name || cartItems[0]?.title || "Subscription",
                            price: cartItems[0]?.price || formData?.grossAmount || 0,
                            currency: currency || "EUR",
                            interval: cartItems[0]?.interval || "MONTH",
                            intervalCount: cartItems[0]?.intervalCount || 1,
                        };

                        const planRes = await fetch("/api/paypal/create-plan", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(planPayload),
                        });

                        if (!planRes.ok) {
                            const errorData = await planRes.json().catch(() => ({}));
                            throw new Error(errorData.error || "Failed to generate PayPal Plan ID");
                        }

                        const planData = await planRes.json();

                        // 2. Call backend /Subscriptions/create
                        const subPayload = {
                            pricingTierId: cartItems[0]?.variantId?.toString().replace('sub-', ''),
                            paymentGateway: "PayPal",
                            payPalPlanId: planData.planId,
                            currency: currency || "USD"
                        };

                        if (formData.gatewayCustomerId) {
                            subPayload.gatewayCustomerId = formData.gatewayCustomerId;
                        }

                        const subRes = await apiService.post("/Subscriptions/create", subPayload);
                        const resData = subRes.data || subRes.result || subRes;

                        // Retrieve the subscription ID returned from the backend API
                        const subscriptionId = resData?.subscriptionId || resData?.paypalSubscriptionId || resData?.id;

                        // Extract ba_token from the approve link if present
                        if (resData?.links) {
                            const approveLink = resData.links.find(link => link.rel === "approve");
                            if (approveLink) {
                                try {
                                    const url = new URL(approveLink.href);
                                    baTokenRef.current = url.searchParams.get("ba_token");
                                    console.log("PAYPAL ba_token extracted:", baTokenRef.current);
                                } catch (e) {
                                    console.error("Failed to parse ba_token from approve link", e);
                                }
                            }
                        }

                        console.log("PAYPAL subRes:", subRes);
                        console.log("PAYPAL subscriptionId extracted:", subscriptionId);

                        const isSuccess = subRes.success !== false && subRes.isSuccess !== false;

                        if (!isSuccess) {
                            throw new Error(subRes.message || "Failed to create subscription on server");
                        }

                        if (subscriptionId) {
                            return subscriptionId;
                        }

                        // If backend doesn't return a PayPal subscription ID, fallback to creating it on the client
                        return actions.subscription.create({
                            plan_id: planData.planId
                        });
                    } catch (err) {
                        console.error("PayPal createSubscription error:", err);
                        onError(err.message || "Failed to initialize PayPal subscription.");
                        throw err; // Re-throw to inform PayPal buttons
                    }
                } : undefined}
                onApprove={async (data, actions) => {
                    try {
                        let details;
                        const payload = buildGuestOrderPayload(formData, cartItems, currency);
                        payload.paymentMethod = "PayPal";

                        if (isSubscription) {
                            // Send the approved subscription ID as the paymentToken
                            // This fulfills the "token is required" backend validation
                            payload.paymentToken = data.subscriptionID;
                            payload.subscriptionId = data.subscriptionID;
                            console.log("PAYPAL SUBSCRIPTION PAYLOAD:", payload);
                        } else {
                            // For one-time payments, capture the order.
                            details = await actions.order.capture();
                            payload.paymentToken = details.id;
                        }

                        const response = await apiService.post("/Checkout/create-order", payload);

                        if (response.success) {
                            onSuccess(response.data);
                        } else {
                            onError(response.message || "Order creation failed.");
                        }
                    } catch (err) {
                        console.error("PayPal onApprove error:", err);
                        onError("PayPal payment approval failed.");
                    }
                }}
                onError={(err) => {
                    console.error("PayPal payment error:", err);
                    onError("PayPal payment failed. Please try again.");
                }}
            />
        </div>
    );
}

// ─── Adapter Export ───────────────────────────────────────────────────────────
const paypalGateway = {
    name: "PayPal",
    ProviderComponent: PayPalGatewayProvider,
    CheckoutComponent: PayPalCheckoutComponent,
};

export default paypalGateway;
