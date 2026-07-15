"use client";

import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function OrderConfirmation({ orderData, formatPrice, isLoggedIn, formData, totals, localization }) {
    if (!orderData) return null;

    const discountLabel = formData?.couponCode
        ? `Promo Code (${formData.couponCode})`
        : formData?.affiliateCustomerCode
            ? `Affiliate Code (${formData.affiliateCustomerCode})`
            : "Discount";

    return (
        <FaderInAnimation direction="up">
            <div className="max-w-lg mx-auto py-12">
                {/* Confirmation Card */}
                <div className="bg-white dark:bg-white/5 border border-divider rounded-3xl shadow-xl shadow-accent/5 overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-br from-accent/10 via-accent/5 to-transparent px-8 pt-10 pb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                                <HiCheckCircle className="text-5xl text-accent" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-2">{localization?.checkout_confirm_title}</h2>
                        <p className="text-text/70 font-accent text-sm">
                            {localization?.checkout_confirm_desc}
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="px-8 py-6 space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">{localization?.checkout_confirm_invoice}</span>
                            <span className="text-sm font-bold text-primary">#{orderData?.invoiceNumber || orderData?.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">{localization?.checkout_confirm_total}</span>
                            <span className="text-sm font-bold text-text">{formatPrice(orderData?.actualTotalAmount || orderData?.totalNetAmount || orderData?.grossAmount)}</span>
                        </div>
                        {totals?.discountAmount > 0 && (
                            <div className="flex justify-between items-center py-3 border-b border-divider">
                                <span className="text-sm text-text/60 font-accent">{discountLabel}</span>
                                <span className="text-sm font-bold text-accent">-{formatPrice(totals.discountAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-3 border-b border-divider">
                            <span className="text-sm text-text/60 font-accent">{localization?.checkout_confirm_paid}</span>
                            <span className="text-sm font-bold text-accent">{formatPrice(orderData?.paidAmount || totals?.total || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-sm text-text/60 font-accent">{localization?.checkout_confirm_status}</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {orderData?.paymentStatus}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 pb-8 pt-2">
                        <p className="text-xs text-text/50 font-accent text-center mb-6">
                            {localization?.checkout_confirm_email_sent}
                        </p>
                        {isLoggedIn ? (
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link href={`/order-detail?orderId=${orderData?.orderId}`} className="block flex-1">
                                    <Button variant="outline" size="lg" className="rounded-full! w-full border-2 border-divider hover:border-accent">
                                        {localization?.checkout_confirm_view_order}
                                    </Button>
                                </Link>
                                <Link href="/dashboard" className="block flex-1">
                                    <Button variant="accent" size="lg" className="rounded-full! w-full">
                                        {localization?.checkout_confirm_dashboard}
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/subscribe" className="block">
                                <Button variant="accent" size="lg" className="rounded-full! px-12 w-full">
                                    {localization?.checkout_confirm_continue}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </FaderInAnimation>
    );
}
