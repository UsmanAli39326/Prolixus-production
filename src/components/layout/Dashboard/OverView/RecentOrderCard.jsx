import Link from "next/link";
import { FaTruck, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Badge from "@/components/ui/Badge";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/utitlis/formatters";

export default function RecentOrderCard({ order }) {
    const { formatPrice } = useCurrency();

    return (
        <div className="bg-white dark:bg-background-dark/30 rounded-2xl shadow-sm border border-divider group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-divider/50">
                {/* Invoice & Status */}
                <div className="p-5 sm:p-6 lg:p-7 flex items-center gap-4 min-w-0">
                    <div className="p-3.5 sm:p-4 bg-accent/10 rounded-xl text-accent shrink-0">
                        <FaTruck className="text-xl sm:text-2xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text/50 font-bold mb-1 sm:mb-1.5">Invoice</p>
                        <p className="text-sm sm:text-[15px] font-extrabold text-primary truncate leading-tight">
                            {order.invoiceNumber}
                        </p>
                    </div>
                </div>

                {/* Order Date */}
                <div className="p-5 sm:p-6 lg:p-7 flex items-center gap-4 min-w-0">
                    <div className="p-3.5 sm:p-4 bg-primary/8 rounded-xl text-primary/50 shrink-0">
                        <FaCalendarAlt className="text-lg sm:text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text/50 font-bold mb-1 sm:mb-1.5">Order Date</p>
                        <p className="text-sm sm:text-[15px] font-extrabold text-primary leading-tight">
                            {formatDate(order.transactionDate, 'date')}
                        </p>
                    </div>
                </div>

                {/* Status & Payment */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-center gap-2 sm:gap-2.5">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text/50 font-bold">Status</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="info" dot className="text-[9px] sm:text-[11px] py-0.5 sm:py-1 px-2 sm:px-2.5 font-bold">
                            {order.orderStatus || "Processing"}
                        </Badge>
                        <Badge variant={order.isPaid ? "success" : "warning"} dot className="text-[9px] sm:text-[11px] py-0.5 sm:py-1 px-2 sm:px-2.5 font-bold">
                            {order.isPaid ? "Paid" : "Unpaid"}
                        </Badge>
                    </div>
                </div>

                {/* Total & Action */}
                <div className="p-5 sm:p-6 lg:p-7 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text/50 font-bold mb-1 sm:mb-1.5">Total</p>
                        <p className="text-lg sm:text-xl font-extrabold text-primary">
                            {formatPrice(order.paidAmount ?? order.totalNetAmount ?? 0)}
                        </p>
                    </div>
                    <Link
                        href={`/order-detail?orderId=${order.id}`}
                        className="p-3 sm:p-3.5 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/15 group-hover:shadow-accent/25 transition-all shrink-0"
                    >
                        <FaArrowRight className="text-sm sm:text-base" />
                    </Link>
                </div>
            </div>
        </div>
    );
}