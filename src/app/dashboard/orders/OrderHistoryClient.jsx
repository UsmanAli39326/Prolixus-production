"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaFilter, FaDownload, FaArrowRight } from "react-icons/fa";
import { MdLoop } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { getCustomerOrders, getOrderStatuses } from "@/lib/OrderService";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/utitlis/formatters";

const statusConfig = {
    "Shipped": { variant: "success" },
    "Delivered": { variant: "info" },
    "Processing": { variant: "warning", animate: true, icon: MdLoop },
    "Inprogress": { variant: "warning", animate: true, icon: MdLoop },
    "Cancelled": { variant: "error", icon: IoClose },
    "Pending": { variant: "warning" },
};

export default function OrderHistoryPage({ localization }) {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { formatPrice } = useCurrency();
    const [filterStatus, setFilterStatus] = useState("All");
    const [statuses, setStatuses] = useState(["All"]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [ordersResponse, statusesResponse] = await Promise.all([
                    getCustomerOrders(),
                    getOrderStatuses()
                ]);

                const ordersData = ordersResponse.data || ordersResponse || [];
                const statusesData = statusesResponse.data || statusesResponse || [];

                if (isMounted) {
                    const mappedOrders = ordersData.map(entry => {
                        const order = entry.order || entry;
                        const summary = entry.orderHeadSummary;
                        const config = statusConfig[order.orderStatus] || { variant: "secondary" };
                        return {
                            id: order.id,
                            invoiceNumber: order.invoiceNumber,
                            date: formatDate(order.transactionDate, 'datetime'),
                            status: summary?.orderStatus || order.orderStatus || "Processing",
                            isPaid: order.isPaid,
                            total: formatPrice(summary?.paidAmount ?? order.totalNetAmount ?? 0),
                            paymentType: summary?.paymentType || order.paymentType,
                            customerAffiliatedAmount: order.customerAffiliatedAmount || 0,
                            ...config
                        };
                    });
                    setOrders(mappedOrders);
                    setFilteredOrders(mappedOrders);
                    setStatuses(["All", ...statusesData]);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || localization?.order_history_error_fetch);
                    console.error("Dashboard fetch error:", err);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (filterStatus === "All") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === filterStatus));
        }
        setCurrentPage(1);
    }, [filterStatus, orders]);

    const columns = [
        {
            header: localization?.order_history_header_date,
            cellClassName: "whitespace-nowrap",
            cell: (row) => {
                const parts = row.date.split(', ');
                return (
                    <div className="flex flex-col">
                        <span className="text-black font-medium">{parts[0]}</span>
                        {parts[1] && <span className="text-xs text-black/60">{parts[1]}</span>}
                    </div>
                );
            }
        },
        {
            header: localization?.order_history_header_invoice,
            accessor: "invoiceNumber",
            cellClassName: "text-black font-bold"
        },
        {
            header: localization?.order_history_header_status,
            cell: (row) => (
                <Badge
                    variant={row.variant}
                    dot={!row.icon}
                    icon={row.icon}
                    animate={row.animate}
                >
                    {row.status}
                </Badge>
            )
        },
        {
            header: localization?.order_history_header_payment,
            cell: (row) => (
                <Badge
                    variant={row.isPaid ? "success" : "warning"}
                    dot
                >
                    {row.isPaid ? localization?.order_history_paid : localization?.order_history_unpaid}
                </Badge>
            )
        },
        {
            header: localization?.order_history_header_wallet,
            cellClassName: "text-black font-medium",
            cell: (row) => formatPrice(row.customerAffiliatedAmount)
        },
        {
            header: localization?.order_history_header_total,
            accessor: "total",
            cellClassName: "text-black font-medium"
        },
        {
            header: localization?.order_history_header_action,
            className: "text-right pr-8",
            cellClassName: "text-right pr-8",
            cell: (row) => (
                <Link
                    href={`/order-detail?orderId=${row.id}`}
                    className="inline-flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-bold tracking-wide transition-colors group-hover:underline decoration-2 underline-offset-4"
                >
                    {localization?.order_history_view_details}
                    <FaArrowRight className="text-[10px]" />
                </Link>
            )
        }
    ];

    const totalItems = filteredOrders.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const pagination = {
        currentPage,
        totalPages,
        from: totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1,
        to: Math.min(currentPage * itemsPerPage, totalItems),
        total: totalItems,
        onPageChange: (page) => setCurrentPage(page),
        onPrev: () => setCurrentPage(p => Math.max(1, p - 1)),
        onNext: () => setCurrentPage(p => Math.min(totalPages, p + 1))
    };

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title={localization?.order_history_title}
                    subtitle={localization?.order_history_subtitle}
                    action={
                        <div className="flex gap-2">
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white border border-divider rounded-lg px-4 py-2 pr-10 text-sm font-bold text-primary focus:outline-none focus:border-accent cursor-pointer shadow-sm hover:bg-secondary/20 transition-all"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>
                                            {status === "All" ? (localization?.order_history_filter_all || "All") : status}
                                        </option>
                                    ))}
                                </select>
                                <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-text/40 pointer-events-none" />
                            </div>
                        </div>
                    }
                />
            </RevealInAnimation>

            <FaderInAnimation direction="up" delay={0.2}>
                <div className="flex flex-col gap-6">
                    {error ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                            {error}
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={paginatedOrders}
                            pagination={pagination}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </FaderInAnimation>
        </div>
    );
}


