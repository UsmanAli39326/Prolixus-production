"use client";

import Badge from "@/components/ui/Badge";
import { stripHtmlTags } from "@/utitlis/formatters";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { getImageUrl } from "@/lib/ImageService";

export default function OrderItem({ item }) {
    const { formatPrice } = useCurrency();
    const { t } = useLanguage();
    const bundleQty = item.bundleQuantity || 1;
    const totalUnits = (item.quantity || 1) * bundleQty;
    return (
        <div className="flex gap-3 py-1">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100 dark:border-white/5 relative">
                {item.image ? (
                    <Image
                        src={getImageUrl(item.image)}
                        alt={item.name || item.title || "Product image"}
                        width={48}
                        height={48}
                        unoptimized={true}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-linear-to-br ${item.color || 'from-amber-50 to-orange-100'}`} />
                )}
                {totalUnits > 1 && (
                    <Badge
                        variant="info"
                        className="absolute -top-1.5 -right-1.5 size-4 flex items-center justify-center p-0 text-[8px]"
                    >
                        {totalUnits}
                    </Badge>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <h4 className="font-semibold text-primary text-base leading-snug font-accent truncate">{item.name || item.title || item.variantLabel}</h4>
                <div className="flex items-center gap-2 flex-wrap text-sm text-text/50 font-default">
                    <span className="truncate max-w-[120px]">
                        {item.variant || stripHtmlTags(item.description) || t('checkout.order_item.product', 'Product')}
                    </span>
                    <span className="shrink-0">
                        {t('checkout.order_item.qty', 'Qty')}: {totalUnits}
                        {bundleQty > 1 && (
                            <span className="ml-1 text-[10px] text-text/35">
                                ({item.quantity}&times;{bundleQty})
                            </span>
                        )}
                    </span>
                    {item.purchaseType === "subscribe" && (
                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                            {t('checkout.order_item.monthly', 'Monthly')}
                        </span>
                    )}
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center shrink-0">
                <span className="font-bold text-primary text-base font-default whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
            </div>
        </div>
    );
}
