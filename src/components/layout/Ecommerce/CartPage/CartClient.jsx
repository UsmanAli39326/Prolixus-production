"use client";
import React from "react";
import Link from "next/link";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Button from "@/components/ui/Button";
import useCart from "@/Hooks/useCart";
import { stripHtmlTags } from "@/utitlis/formatters";
import { calcCartTotals } from "@/lib/cart";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiArrowRight, FiCheck, FiShield, FiTruck, FiPackage, FiLock, FiRefreshCw } from "react-icons/fi";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/ImageService";

export default function CartClient({ localization }) {
  const { t } = useLanguage();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isLoggedIn } = useAuth();

  const oneTimeItems = cartItems.filter(item => item.purchaseType !== "subscribe");
  const subscriptionItems = cartItems.filter(item => item.purchaseType === "subscribe");
  const hasOneTime = oneTimeItems.length > 0;
  const hasSubscription = subscriptionItems.length > 0;
  const hasMixed = hasOneTime && hasSubscription;

  // Subscription items in cart require login
  const needsLogin = hasSubscription && !isLoggedIn;

  // Per-type totals
  const oneTimeTotals = calcCartTotals(oneTimeItems);
  const subscriptionTotals = calcCartTotals(subscriptionItems);

  return (
    <FaderInAnimation direction="up">
      <div className="min-h-screen bg-secondary py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <FaderInAnimation direction="down" delay={0.1}>
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-divider">
                <div>
                  <h1 className="font-accent italic text-3xl sm:text-5xl font-light leading-[1.05] tracking-[-0.02em] text-primary lg:text-6xl">
                    {localization?.cart_title || t("cart_title", "Cart")}
                  </h1>
                  <p className="max-w-[620px] font-default text-sm sm:text-base leading-relaxed text-text mt-2 lg:text-lg">
                    {cartItems.length} {cartItems.length === 1
                      ? (localization?.cart_item_singular || t("cart_item_singular", "item"))
                      : (localization?.cart_item_plural || t("cart_item_plural", "items"))
                    } {localization?.cart_in_your_cart || t("cart_in_your_cart", "in your cart")}
                  </p>
                </div>
                <Link href="/subscribe" className="group inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                  <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium text-sm sm:text-base">{localization?.cart_continue_shopping || t("cart_continue_shopping", "Continue Shopping")}</span>
                </Link>
              </div>
            </div>
          </FaderInAnimation>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <FaderInAnimation direction="up" delay={0.2}>
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-2 flex items-center justify-center">
                  <FiPackage className="w-12 h-12 text-text/50" />
                </div>
                <h2 className="text-2xl font-accent font-semibold text-primary mb-2">
                  {localization?.cart_empty_title || t("cart_empty_title", "Your cart is empty")}
                </h2>
                <p className="text-text mb-8">
                  {localization?.cart_empty_desc || t("cart_empty_desc", "Looks like you haven't added any products to your cart yet.")}
                </p>
                <Link href="/subscribe">
                  <Button variant="accent" size="lg">
                    {localization?.cart_start_shopping || t("cart_start_shopping", "Start Shopping")}
                  </Button>
                </Link>
              </div>
            </FaderInAnimation>
          ) : (
            /* Cart Content */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items Column */}
              <div className="lg:col-span-2">
                {/* Table Header - Desktop Only */}
                <FaderInAnimation direction="left" delay={0.15}>
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-xs font-semibold text-text uppercase tracking-wider border-b border-divider">
                    <div className="col-span-6">{localization?.cart_header_product || t("cart_header_product", "Product")}</div>
                    <div className="col-span-2 text-center">{localization?.cart_header_quantity || t("cart_header_quantity", "Quantity")}</div>
                    <div className="col-span-2 text-center">{localization?.cart_header_price || t("cart_header_price", "Price")}</div>
                    <div className="col-span-2 text-right">{localization?.cart_header_total || t("cart_header_total", "Total")}</div>
                  </div>
                </FaderInAnimation>

                {/* Cart Items */}
                <div className="space-y-4 mt-4">
                  {cartItems.map((item, index) => (
                    <FaderInAnimation key={item.id} direction="left" delay={0.2 + index * 0.1}>
                      <div className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-divider hover:shadow-md transition-shadow duration-300">
                        {/* Desktop layout: 12-col grid */}
                        <div className="hidden md:grid md:grid-cols-12 gap-6 items-center">
                          {/* Product Info */}
                          <div className="col-span-6 flex gap-4 items-center">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                              <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                  backgroundImage: `url('${getImageUrl(item.image)}')`,
                                  backgroundColor: "var(--surface-2-color)",
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-accent text-lg font-medium text-primary leading-tight">
                                  {item.name || item.title || item.variantLabel}
                                </h3>
                                {/* Purchase type badge */}
                                <PurchaseTypeBadge purchaseType={item.purchaseType} />
                              </div>
                              <p className="text-sm text-text line-clamp-1">{stripHtmlTags(item.description)}</p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-2 flex justify-center">
                            {item.bundleQuantity ? (
                              <span className="text-sm font-medium text-text bg-surface-2 px-4 py-2 rounded-full border border-divider">
                                {t("cart_qty_label", "Qty")}: {item.bundleQuantity}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 bg-secondary rounded-full p-1 border border-divider">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <FiMinus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200"
                                >
                                  <FiPlus className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Unit Price */}
                          <div className="col-span-2 text-center font-medium text-text">
                            {formatPrice(item.price)}
                          </div>

                          {/* Line Total & Delete */}
                          <div className="col-span-2 flex items-center justify-end gap-4">
                            <span className="font-semibold text-primary text-lg">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-full text-text hover:text-error hover:bg-error/10 transition-all duration-200"
                              title={localization?.cart_remove_item || t("cart_remove_item", "Remove item")}
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Mobile layout: stacked */}
                        <div className="flex flex-col gap-3 md:hidden">
                          {/* Top row: image + product details */}
                          <div className="flex gap-3 items-center">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                              <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url('${getImageUrl(item.image)}')`,
                                  backgroundColor: "var(--surface-2-color)",
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="font-accent text-sm font-medium text-primary leading-tight line-clamp-2">
                                  {item.name || item.title || item.variantLabel}
                                </h3>
                                <PurchaseTypeBadge purchaseType={item.purchaseType} small />
                              </div>
                              <p className="text-accent font-semibold text-sm">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>

                          {/* Bottom row: quantity | total | delete */}
                          <div className="flex items-center justify-between pt-2 border-t border-divider/50">
                            {/* Quantity Controls */}
                            {item.bundleQuantity ? (
                              <span className="text-xs font-medium text-text bg-surface-2 px-3 py-1.5 rounded-full border border-divider">
                                {t("cart_qty_label", "Qty")}: {item.bundleQuantity}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 bg-secondary rounded-full p-0.5 border border-divider">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <FiMinus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-primary transition-colors duration-200"
                                >
                                  <FiPlus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {/* Line Total + Delete */}
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-primary text-base">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1.5 rounded-full text-text/60 hover:text-error hover:bg-error/10 transition-all duration-200"
                                title={localization?.cart_remove_item || t("cart_remove_item", "Remove item")}
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FaderInAnimation>
                  ))}
                </div>

                {/* Trust Badges - Mobile */}
                <FaderInAnimation direction="up" delay={0.5}>
                  <div className="mt-8 p-6 bg-surface-2 rounded-2xl lg:hidden">
                    <div className="flex flex-wrap gap-6 justify-center">
                      <TrustBadge icon={<FiShield />} text={localization?.cart_badge_organic || t("cart_badge_organic", "Organic")} />
                      <TrustBadge icon={<FiTruck />} text={localization?.cart_badge_shipping || t("cart_badge_shipping", "Free Shipping")} />
                      <TrustBadge icon={<FiCheck />} text={localization?.cart_badge_quality || t("cart_badge_quality", "Quality Guarantee")} />
                    </div>
                  </div>
                </FaderInAnimation>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-1">
                <FaderInAnimation direction="right" delay={0.3}>
                  <div className="sticky top-24 space-y-6">
                    {/* Summary Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-divider">
                      <h2 className="text-2xl font-accent font-semibold text-primary mb-6">
                        {localization?.cart_order_summary || t("cart_order_summary", "Order Summary")}
                      </h2>

                      {/* Calculations */}
                      <div className="space-y-4 mb-6">
                        {hasMixed ? (
                          /* Split totals when both types present */
                          <>
                            {/* One-Time section */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-text">
                                {t("cart_one_time_subtotal", "One-Time")}
                              </span>
                              <span className="font-medium text-primary">{formatPrice(oneTimeTotals.subtotal)}</span>
                            </div>

                            {/* Subscription section */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-text">
                                {t("cart_subscription_subtotal", "Subscription")}
                              </span>
                              <span className="font-medium text-primary">
                                {formatPrice(subscriptionTotals.subtotal)}<span className="text-xs text-text/50 ml-0.5">/mo</span>
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <span className="text-text">{localization?.cart_shipping || t("cart_shipping", "Shipping")}</span>
                              <span className="font-medium text-accent">{localization?.cart_shipping_free || t("cart_shipping_free", "Free")}</span>
                            </div>

                            <div className="h-px bg-divider my-4" />

                            {/* Due now = one-time only (subscription billed monthly) */}
                            <div className="flex justify-between items-center">
                              <span className="text-base font-accent font-semibold text-primary">{t("cart_due_now", "Due Now")}</span>
                              <span className="text-2xl font-bold text-primary">{formatPrice(oneTimeTotals.total)}</span>
                            </div>
                            <p className="text-xs text-text/50 text-right -mt-2">
                              {t("cart_subscription_billed_separately", "Subscription billed monthly separately")}
                            </p>
                          </>
                        ) : (
                          /* Single-type totals */
                          <>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-text">{localization?.cart_subtotal || t("cart_subtotal", "Subtotal")}</span>
                              <span className="font-medium text-primary">
                                {formatPrice(hasSubscription ? subscriptionTotals.subtotal : oneTimeTotals.subtotal)}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <span className="text-text">{localization?.cart_shipping || t("cart_shipping", "Shipping")}</span>
                              <span className="font-medium text-accent">{localization?.cart_shipping_free || t("cart_shipping_free", "Free")}</span>
                            </div>

                            {(hasSubscription ? subscriptionTotals : oneTimeTotals).vatDetails?.map((vat) => (
                              <div key={vat.percentage} className="flex justify-between items-center text-sm">
                                <span className="text-text">{localization?.cart_vat || t("cart_vat", "VAT")} ({vat.percentage}%)</span>
                                <span className="font-medium text-primary">{formatPrice(vat.amount)}</span>
                              </div>
                            ))}

                            <div className="h-px bg-divider my-4" />

                            <div className="flex justify-between items-center">
                              <span className="text-xl font-accent font-semibold text-primary">
                                {localization?.cart_total || t("cart_total", "Total")}
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-primary">
                                  {formatPrice(hasSubscription ? subscriptionTotals.total : oneTimeTotals.total)}
                                </span>
                                {hasSubscription && <span className="text-sm text-text/50">/mo</span>}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Checkout Button */}
                      {needsLogin ? (
                        /* Subscription items in cart require login */
                        <div className="space-y-3">
                          <Link href="/login?redirect=/cart">
                            <Button
                              variant="accent"
                              size="lg"
                              fullWidth
                              className="group"
                              rightIcon={<FiLock className="w-4 h-4" />}
                            >
                              {localization?.cart_login_to_subscribe || t("cart_login_to_subscribe", "Login to Checkout")}
                            </Button>
                          </Link>
                          <p className="text-center text-xs text-text/60">
                            {localization?.cart_account_required_sub || t("cart_account_required_sub", "An account is required to purchase subscriptions")}
                          </p>
                        </div>
                      ) : (
                        <Link href="/checkout">
                          <Button
                            variant="accent"
                            size="lg"
                            fullWidth
                            className="group"
                            rightIcon={<FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                          >
                            {localization?.cart_checkout_button || t("cart_checkout_button", "Proceed to Checkout")}
                          </Button>
                        </Link>
                      )}

                      <p className="text-center text-xs text-text mt-4 flex items-center justify-center gap-1">
                        <FiShield className="w-3 h-3" /> {localization?.cart_secure_checkout}
                      </p>
                    </div>
                  </div>
                </FaderInAnimation>
              </div>
            </div>
          )}
        </div>
      </div>
    </FaderInAnimation>
  );
}

// Purchase type pill badge
function PurchaseTypeBadge({ purchaseType, small }) {
  const isSubscription = purchaseType === "subscribe";
  const base = small
    ? "inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border"
    : "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border";
  const style = isSubscription
    ? "bg-accent/10 text-accent border-accent/20"
    : "bg-surface-2 text-text/60 border-divider";
  return (
    <span className={`${base} ${style}`}>
      {isSubscription
        ? <><FiRefreshCw className={small ? "w-2 h-2" : "w-2.5 h-2.5"} /> Sub</>
        : <><FiPackage className={small ? "w-2 h-2" : "w-2.5 h-2.5"} /> One-Time</>
      }
    </span>
  );
}

// Trust Badge Component - Mobile
function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <span className="text-accent">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

