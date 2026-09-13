"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { apiService } from "@/lib/api";

// ─── Provider ─────────────────────────────────────────────────────────────────
function PayPalGatewayProvider({ publishableKey, currency, isSubscription, children }) {
    if (!publishableKey) {
        return <p className="text-red-500 text-sm">PayPal configuration is missing.</p>;
    }

    const options = {
        clientId: publishableKey,
        currency: currency || "EUR",
        intent: "capture",
    };

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
    return (
        <div className="bg-surface border border-divider rounded-2xl p-6 my-6">
            <p className="text-primary font-bold mb-4">Pay with PayPal</p>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    const payload = buildGuestOrderPayload(formData, cartItems, currency);
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: (payload.grossAmount || 0).toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    try {
                        const details = await actions.order.capture();
                        const payload = buildGuestOrderPayload(formData, cartItems, currency);
                        payload.paymentMethod = "PayPal";
                        payload.paymentToken = details.id;

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
