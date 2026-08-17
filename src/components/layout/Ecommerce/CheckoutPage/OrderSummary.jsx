"use client";
import { useState } from "react";
import OrderItem from "./OrderItem";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckout } from "@/context/CheckoutContext";
import { apiService } from "@/lib/api";
import { buildGuestOrderPayload } from "./CheckoutWizard";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderSummary() {
    const { formatPrice } = useCurrency();
    const { formData, updateFormData, totals, user, isAuthenticated, checkoutItems, isSubscription } = useCheckout();
    const { t } = useLanguage();

    const [inputCode, setInputCode] = useState("");
    const [codeType, setCodeType] = useState("promo");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleApply = async () => {
        if (!inputCode.trim()) return;
        setError("");
        setLoading(true);

        try {
            if (codeType === "promo") {
                // Validate coupon via backend POST API
                const result = await apiService.post("/Checkout/validate-coupon", {
                    code: inputCode.trim(),
                });

                if (result?.data?.isValid) {
                    // Discount is a percentage — calculate the amount from subtotal
                    const discountAmount = Math.trunc(
                        ((totals.subtotal * (result.data.discountPercentage || 0)) / 100) * 100
                    ) / 100;

                    updateFormData({
                        couponCode: result.data.code || inputCode.trim(),
                        affiliateCustomerCode: "",
                        discountAmount,
                        discountDisplay: `${result.data.discountPercentage}%`,
                    });
                    setInputCode("");
                } else {
                    setError(result?.data?.message || "Invalid coupon code");
                }
            } else {
                // Validate affiliate code via backend POST API
                const result = await apiService.post("/Checkout/validate-affiliate", {
                    code: inputCode.trim(),
                });


                if (result?.data?.isValid) {
                    // Check if this is the user's own affiliate code
                    if (isAuthenticated && result.data.affiliateCustomerId === user?.id) {
                        setError("You cannot use your own affiliate code.");
                        setLoading(false);
                        return;
                    }

                    // Calculate discount amount from userUsedAffiliatePercentage
                    const discountAmount = Math.trunc(
                        ((totals.subtotal * (result.data.userUsedAffiliatePercentage || 0)) / 100) * 100
                    ) / 100;

                    updateFormData({
                        couponCode: "",
                        affiliateCustomerCode: result.data.code || inputCode.trim(),
                        discountAmount: discountAmount,
                        discountDisplay: `${result.data.userUsedAffiliatePercentage}%`,
                    });
                    setInputCode("");
                } else {
                    setError(result?.data?.message || "Invalid affiliate code");
                }
            }
        } catch (err) {
            setError("Failed to validate code. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    // Whether a promo/affiliate code is currently active
    const hasCodeApplied = !!(formData.couponCode || formData.affiliateCustomerCode);



    return (
        <aside className="lg:col-span-12 xl:col-span-5 relative">
            <div className="sticky top-28 bg-surface rounded-4xl p-6 lg:p-8 shadow-xl shadow-divider/50 border border-divider">
                <RevealInAnimation direction="bottom">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-divider">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-primary">{t('checkout.order_summary.title', 'Order Summary')}</h3>
                            {isSubscription && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                                    {t('checkout.order_summary.subscription', 'Subscription')}
                                </span>
                            )}
                        </div>
                        <span className="text-sm text-gray-400 font-accent">{checkoutItems.length} {t('checkout.order_summary.items', 'items')}</span>
                    </div>
                </RevealInAnimation>

                {/* Items */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {checkoutItems.length > 0 ? (
                            checkoutItems.map((item) => (
                                <OrderItem key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="text-gray-500 py-8 italic font-accent text-left">{t('checkout.order_summary.cart_empty', 'Your cart is empty')}</p>
                        )}
                    </div>
                </FaderInAnimation>

                {/* Discount Section */}
                <FaderInAnimation direction="up" delay={0.15}>
                    <div className="mb-6 pt-6 border-t border-divider">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => { setCodeType("promo"); setError(""); setInputCode(""); }}
                                disabled={hasCodeApplied}
                                className={`text-xs font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${hasCodeApplied ? "opacity-50 cursor-not-allowed" : ""} ${codeType === "promo" ? "border-accent text-primary" : "border-transparent text-gray-400 hover:text-primary"}`}
                            >
                                {t('checkout.order_summary.promo_code', 'Promo Code')}
                            </button>
                            <button
                                onClick={() => { setCodeType("affiliate"); setError(""); setInputCode(""); }}
                                disabled={hasCodeApplied}
                                className={`text-xs font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${hasCodeApplied ? "opacity-50 cursor-not-allowed" : ""} ${codeType === "affiliate" ? "border-accent text-primary" : "border-transparent text-gray-400 hover:text-primary"}`}
                            >
                                {t('checkout.order_summary.affiliate_code', 'Affiliate Code')}
                            </button>
                        </div>

                        {/* Promo / Affiliate input */}
                        <>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder={codeType === "promo" ? t('checkout.order_summary.enter_promo_code', 'Enter promo code') : t('checkout.order_summary.enter_affiliate_code', 'Enter affiliate code')}
                                        value={inputCode}
                                        disabled={hasCodeApplied}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setInputCode(val);
                                            if (val.trim() === "") setError("");
                                        }}
                                        className="w-full h-11 px-4 bg-white dark:bg-white/5 disabled:bg-gray-50/50 disabled:cursor-not-allowed border border-divider rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm font-default transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handleApply}
                                    disabled={!inputCode.trim() || loading || hasCodeApplied}
                                    className="bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs px-5 h-11 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                                >
                                    {loading ? "..." : t('checkout.order_summary.apply', 'Apply')}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold">{error}</p>}

                            {(formData.couponCode || formData.affiliateCustomerCode) && (
                                <div className="mt-4 p-3 bg-accent/5 rounded-xl border border-accent/20 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                                    <div className="text-xs">
                                        <span className="text-gray-400 block uppercase text-[8px] font-bold">{t('checkout.order_summary.applied', 'Applied')} {formData.couponCode ? t('checkout.order_summary.promo', 'Promo') : t('checkout.order_summary.affiliate', 'Affiliate')}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary font-bold">{formData.couponCode || formData.affiliateCustomerCode}</span>
                                            {formData.discountDisplay && (
                                                <span className="text-accent font-bold px-1.5 py-0.5 bg-accent/10 rounded text-[9px] whitespace-nowrap">
                                                    {formData.discountDisplay} {t('checkout.order_summary.off', 'OFF')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateFormData({ couponCode: "", affiliateCustomerCode: "", discountAmount: 0, discountDisplay: "" })}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}
                        </>
                    </div>
                </FaderInAnimation>

                {/* Price Breakdown */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-3 text-sm text-left">
                        <div className="flex justify-between gap-4 text-text/70 font-accent">
                            <span>{t('checkout.order_summary.subtotal', 'Subtotal')}</span>
                            <span className="font-semibold text-primary text-right">{formatPrice(totals.subtotal)}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-text/70 font-accent">
                            <span>{t('checkout.order_summary.shipping', 'Shipping')}</span>
                            <span className="font-semibold text-accent text-right">{t('checkout.order_summary.free', 'Free')}</span>
                        </div>
                        {isSubscription && (
                            <>
                                <div className="flex justify-between gap-4 text-text/70 font-accent">
                                    <span>{t('checkout.order_summary.delivery_interval', 'Delivery Interval')}</span>
                                    <span className="font-semibold text-primary text-right">{t('checkout.order_summary.every_30_days', 'Every 30 Days')}</span>
                                </div>
                                <div className="flex justify-between gap-4 text-text/70 font-accent">
                                    <span>{t('checkout.order_summary.next_billing_date', 'Next Billing Date')}</span>
                                    <span className="font-semibold text-primary text-right">
                                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4 text-text/70 font-accent">
                                    <span>{t('checkout.order_summary.cancellation_terms', 'Cancellation Terms')}</span>
                                    <span className="font-semibold text-accent text-right">{t('checkout.order_summary.cancel_anytime', 'Cancel or pause anytime')}</span>
                                </div>
                            </>
                        )}
                        {totals.vatDetails?.map((vat) => (
                            <div key={vat.percentage} className="flex justify-between gap-4 text-text/70 font-accent">
                                <span>VAT ({vat.percentage}%)</span>
                                <span className="font-semibold text-primary text-right">{formatPrice(vat.amount)}</span>
                            </div>
                        ))}
                        {totals.discountAmount > 0 && (
                            <div className="flex justify-between gap-4 text-accent font-accent font-bold">
                                <span>{t('checkout.order_summary.discount', 'Discount')}</span>
                                <span className="text-right">-{formatPrice(totals.discountAmount)}</span>
                            </div>
                        )}
                        {totals.walletAmount > 0 && (
                            <div className="flex justify-between gap-4 text-accent font-accent font-bold">
                                <span>{t('checkout.order_summary.wallet', 'Wallet')}</span>
                                <span className="text-right">-{formatPrice(totals.walletAmount)}</span>
                            </div>
                        )}
                    </div>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex justify-between items-end mt-6 pt-6 border-t border-divider">
                        <span className="text-base font-medium text-text/60 font-accent">{isSubscription ? t('checkout.order_summary.monthly_total', 'Monthly total') : t('checkout.order_summary.total_due', 'Total due')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-accent tracking-tight">{formatPrice(totals.total)}</span>
                            {isSubscription && <span className="text-sm font-medium text-text/50">{t('checkout.order_summary.per_month', '/mo')}</span>}
                        </div>
                    </div>
                </FaderInAnimation>
            </div>
        </aside>

    );
}

