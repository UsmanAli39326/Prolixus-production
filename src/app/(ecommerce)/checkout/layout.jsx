"use client";

import { usePathname, useSearchParams } from "next/navigation";
import OrderSummary from "@/components/layout/Ecommerce/CheckoutPage/OrderSummary";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";

export default function CheckoutLayout({ children }) {
    return (
        <CheckoutLayoutWrapper>{children}</CheckoutLayoutWrapper>
    );
}

/**
 * Reads the ?type= URL parameter and passes it to the CheckoutProvider.
 * This component exists separately because useSearchParams() requires
 * a client component, while CheckoutProvider needs the value as a prop.
 */
function CheckoutLayoutWrapper({ children }) {
    const searchParams = useSearchParams();
    const checkoutType = searchParams.get("type") || "one-time";

    return (
        <CheckoutProvider checkoutType={checkoutType}>
            <CheckoutLayoutInner>{children}</CheckoutLayoutInner>
        </CheckoutProvider>
    );
}

function CheckoutLayoutInner({ children }) {
    const { orderCompleted, isSubscription, checkoutType } = useCheckout();
    const searchParams = useSearchParams();
    const isSubscribe = searchParams.get("type") === "subscribe" || isSubscription || checkoutType === "subscribe";
    const pathname = usePathname();
    const isStatusPage = pathname.includes("/status");

    return (
        <div className="bg-secondary text-text font-default antialiased min-h-screen flex flex-col">
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #ddd;
                    border-radius: 20px;
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}} />

            <main className={`grow flex justify-center w-full px-4 py-8 lg:px-8 ${isSubscribe ? 'mt-6 lg:mt-10' : ''}`}>
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className={`order-2 xl:order-1 lg:col-span-12 ${(orderCompleted || isStatusPage) ? '' : 'xl:col-span-7'} flex flex-col gap-8`}>
                        <FaderInAnimation direction="up" distance={20}>
                            {children}
                        </FaderInAnimation>
                    </div>
                    {!(orderCompleted || isStatusPage) && (
                        <div className="order-1 xl:order-2 lg:col-span-12 xl:col-span-5">
                            <FaderInAnimation direction="left" delay={0.2}>
                                <OrderSummary />
                            </FaderInAnimation>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
