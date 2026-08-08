"use client";

import Badge from "@/components/ui/Badge";
import { stripHtmlTags } from "@/utitlis/formatters";
import { useCurrency } from "@/context/CurrencyContext";
import Image from "next/image";

export default function OrderItem({ item }) {
    const { formatPrice } = useCurrency();
    return (
        <div className="flex gap-3 py-1">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100 dark:border-white/5 relative">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name || item.title || "Product image"}
                        width={48}
                        height={48}
                        unoptimized={true}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-linear-to-br ${item.color || 'from-amber-50 to-orange-100'}`} />
                )}
                {item.quantity > 1 && (
                    <Badge
                        variant="info"
                        className="absolute -top-1.5 -right-1.5 size-4 flex items-center justify-center p-0 text-[8px]"
                    >
                        {item.quantity}
                    </Badge>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <h4 className="font-semibold text-primary text-base leading-snug font-accent truncate">{item.name || item.title || item.variantLabel}</h4>
                <div className="flex items-center gap-3 text-sm text-text/50 font-default">
                    <span className="truncate max-w-[140px]">
                        {item.variant || stripHtmlTags(item.description) || "Product"}
                    </span>
                    <span className="shrink-0">Qty: {item.quantity}</span>
                    {item.purchaseType === "subscribe" && (
                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                            Monthly
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
