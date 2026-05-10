"use client";
import Link from "next/link";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import useCart from "@/Hooks/useCart";
import { stripHtmlTags } from "@/utitlis/formatters";
import { calcCartTotals } from "@/lib/cart";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiArrowRight, FiCheck, FiShield, FiTruck, FiPackage } from "react-icons/fi";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartClient({ localization }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  // Calculate totals — single source of truth via shared utility
  const { subtotal, vatAmount, shipping, total, vatPercentage, allVatPercentages, combinedVatPercentage, vatDetails } = calcCartTotals(cartItems);

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
                    {localization?.cart_title}
                  </h1>
                  <p className="max-w-[620px] font-default text-sm sm:text-base leading-relaxed text-text mt-2 lg:text-lg">
                    {cartItems.length} {cartItems.length === 1 ? localization?.cart_item_singular : localization?.cart_item_plural} in your cart
                  </p>
                </div>
                <Link href="/products" className="group inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                  <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium text-sm sm:text-base">{localization?.cart_continue_shopping}</span>
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
                  {localization?.cart_empty_title}
                </h2>
                <p className="text-text mb-8">
                  {localization?.cart_empty_desc}
                </p>
                <Link href="/products">
                  <Button variant="accent" size="lg">
                    {localization?.cart_start_shopping}
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
                    <div className="col-span-6">{localization?.cart_header_product}</div>
                    <div className="col-span-2 text-center">{localization?.cart_header_quantity}</div>
                    <div className="col-span-2 text-center">{localization?.cart_header_price}</div>
                    <div className="col-span-2 text-right">{localization?.cart_header_total}</div>
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
                                  backgroundImage: `url('${item.image}')`,
                                  backgroundColor: "var(--surface-2-color)",
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <h3 className="font-accent text-lg font-medium text-primary leading-tight">
                                {item.name}
                              </h3>
                              <p className="text-sm text-text line-clamp-1">{stripHtmlTags(item.description)}</p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-2 flex justify-center">
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
                              title={localization?.cart_remove_item}
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
                                  backgroundImage: `url('${item.image}')`,
                                  backgroundColor: "var(--surface-2-color)",
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                              <h3 className="font-accent text-sm font-medium text-primary leading-tight line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-accent font-semibold text-sm">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>

                          {/* Bottom row: quantity | total | delete */}
                          <div className="flex items-center justify-between pt-2 border-t border-divider/50">
                            {/* Quantity Controls */}
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

                            {/* Line Total + Delete */}
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-primary text-base">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1.5 rounded-full text-text/60 hover:text-error hover:bg-error/10 transition-all duration-200"
                                title={localization?.cart_remove_item}
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
                      <TrustBadge icon={<FiShield />} text={localization?.cart_badge_organic} />
                      <TrustBadge icon={<FiTruck />} text={localization?.cart_badge_shipping} />
                      <TrustBadge icon={<FiCheck />} text={localization?.cart_badge_quality} />
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
                        {localization?.cart_order_summary}
                      </h2>

                      {/* Calculations */}
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text">{localization?.cart_subtotal}</span>
                          <span className="font-medium text-primary">{formatPrice(subtotal)}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-text">{localization?.cart_shipping}</span>
                          <span className="font-medium text-accent">{localization?.cart_shipping_free}</span>
                        </div>

                        {vatDetails?.map((vat) => (
                          <div key={vat.percentage} className="flex justify-between items-center text-sm">
                            <span className="text-text">{localization?.cart_vat} ({vat.percentage}%)</span>
                            <span className="font-medium text-primary">{formatPrice(vat.amount)}</span>
                          </div>
                        ))}

                        <div className="h-px bg-divider my-4" />

                        <div className="flex justify-between items-center">
                          <span className="text-xl font-accent font-semibold text-primary">{localization?.cart_total}</span>
                          <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Link href="/checkout">
                        <Button
                          variant="accent"
                          size="lg"
                          fullWidth
                          className="group"
                          rightIcon={<FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                        >
                          {localization?.cart_checkout_button}
                        </Button>
                      </Link>

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

// Trust Badge Component - Mobile
function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <span className="text-accent">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
