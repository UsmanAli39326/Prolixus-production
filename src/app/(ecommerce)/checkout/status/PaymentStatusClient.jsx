"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { apiService } from "@/lib/api";
import OrderConfirmation from "@/components/layout/Ecommerce/CheckoutPage/OrderConfirmation";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import useCart from "@/Hooks/useCart";
import { HiCheckCircle, HiXCircle, HiRefresh, HiShoppingBag } from "react-icons/hi";

/**
 * Fetches the Stripe publishable key dynamically from the payment methods API
 * and returns a cached Stripe promise.
 */
let cachedStripePromise = null;
async function getStripePromise() {
    if (cachedStripePromise) return cachedStripePromise;

    try {
        const response = await apiService.get("/Configuration/paymentmethods");
        const methods = Array.isArray(response)
            ? response
            : response?.data ?? response?.result ?? [];

        const stripeMethod = methods.find(
            (m) => m.name?.toLowerCase() === "stripe" && m.isActive === true
        );

        if (!stripeMethod) return null;

        const publishableKey = stripeMethod.isTestingEnvironment
            ? stripeMethod.testPublishablekey
            : stripeMethod.livePublishablekey;

        if (!publishableKey) return null;

        cachedStripePromise = loadStripe(publishableKey);
        return cachedStripePromise;
    } catch {
        return null;
    }
}

export default function PaymentStatusClient({ localization }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { formatPrice } = useCurrency();
    const { isAuthenticated } = useAuth();
    const { clearCart } = useCart();

    const [status, setStatus] = useState("loading"); // loading, succeeded, processing, error
    const [message, setMessage] = useState(null);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const clientSecret = searchParams.get("payment_intent_client_secret");
        if (!clientSecret) {
            setStatus("error");
            setMessage(localization?.status_error_no_info);
            return;
        }

        let pollInterval;
        let attempts = 0;

        const checkStatus = async () => {
            try {
                const stripe = await getStripePromise();
                if (!stripe) {
                    setStatus("error");
                    setMessage("Stripe configuration not available.");
                    clearInterval(pollInterval);
                    return;
                }
                const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

                if (!paymentIntent) {
                    setStatus("error");
                    setMessage(localization?.status_error_retrieve_failed);
                    clearInterval(pollInterval);
                    return;
                }

                switch (paymentIntent.status) {
                    case "succeeded":
                        clearInterval(pollInterval);
                        await finalizeOrder(paymentIntent);
                        break;

                    case "processing":
                        setStatus("processing");
                        setMessage(localization?.status_processing_title);
                        attempts++;
                        
                        // We do NOT call finalizeOrder immediately here because the backend prefers success.
                        // However, if the polling times out (e.g. after 30 seconds of processing), we call
                        // finalizeOrder as a fallback so that the order is registered in the system.
                        if (attempts >= 10) {
                            clearInterval(pollInterval);
                            await finalizeOrder(paymentIntent);
                        }
                        break;

                    case "requires_payment_method":
                        setStatus("error");
                        setMessage(localization?.status_error_not_successful);
                        clearInterval(pollInterval);
                        break;

                    default:
                        setStatus("error");
                        setMessage(localization?.status_error_generic);
                        clearInterval(pollInterval);
                        break;
                }
            } catch (err) {
                console.error("Status check error:", err);
            }
        };

        const finalizeOrder = async (paymentIntent) => {
            const storedPayload = localStorage.getItem("pendingOrderPayload");
            if (!storedPayload) {
                setStatus("succeeded");
                return;
            }

            try {
                const payload = JSON.parse(storedPayload);
                payload.paymentToken = paymentIntent.id;

                const existingOrder = localStorage.getItem(`order_created_${paymentIntent.id}`);
                if (existingOrder) {
                    setOrderData(JSON.parse(existingOrder));
                    setStatus("succeeded");
                    localStorage.removeItem("pendingOrderPayload");
                    clearCart();
                    return;
                }

                const response = await apiService.post("/Checkout/create-order", payload);
                if (response.success) {
                    setOrderData(response.data);
                    setStatus("succeeded");
                    localStorage.setItem(`order_created_${paymentIntent.id}`, JSON.stringify(response.data));
                    localStorage.removeItem("pendingOrderPayload");
                    clearCart();
                } else {
                    setStatus("error");
                    setMessage(response.message || localization?.status_error_finalize);
                }
            } catch (err) {
                console.error("Order creation error:", err);
                setStatus("error");
                setMessage(localization?.status_error_create_order);
            }
        };

        checkStatus();
        pollInterval = setInterval(checkStatus, 3000);
        return () => clearInterval(pollInterval);
    }, [searchParams]);

    if (status === "loading") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
                <h1 className="text-2xl font-bold text-primary mb-2">{localization?.status_verifying}</h1>
                <p className="text-gray-500 max-w-md">{localization?.status_do_not_close}</p>
            </div>
        );
    }

    if (status === "processing") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h1 className="text-2xl font-bold text-primary mb-2">{localization?.status_processing_title}</h1>
                <p className="text-gray-500 max-w-md mb-8">{message}</p>
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-opacity-90 transition-all"
                >
                    <HiShoppingBag />
                    {localization?.status_back_to_store}
                </button>
            </div>
        );
    }

    if (status === "succeeded" && orderData) {
        return (
            <div className="container mx-auto px-4 py-12">
                <OrderConfirmation
                    orderData={orderData}
                    formatPrice={formatPrice}
                    isLoggedIn={isAuthenticated}
                    localization={localization}
                />
            </div>
        );
    }

    if (status === "succeeded") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <HiCheckCircle size={40} />
                </div>
                <h1 className="text-2xl font-bold text-primary mb-2">{localization?.status_success_title}</h1>
                <p className="text-gray-500 max-w-md">{message || localization?.status_success_desc}</p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-8 px-6 py-3 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all"
                >
                    {localization?.status_back_to_store}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                <HiXCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">{localization?.status_failed_title}</h1>
            <p className="text-red-500 max-w-md">{message}</p>
            <button
                onClick={() => router.push("/checkout")}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-opacity-90 transition-all"
            >
                <HiRefresh />
                {localization?.status_try_again}
            </button>
        </div>
    );
}
