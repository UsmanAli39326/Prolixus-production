"use client";
import React, { useState, useEffect } from "react";
import { FaFilter, FaArrowRight } from "react-icons/fa";

import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { getSubscriptions, getSubscriptionOrders } from "@/lib/SubscriptionService";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/utitlis/formatters";
import Modal from "@/components/ui/Modal";

export default function SubscriptionsClient({ localization }) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { formatPrice } = useCurrency();
    const [filterStatus, setFilterStatus] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [ordersError, setOrdersError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const isCancelled = filterStatus === "Cancelled";
                const response = await getSubscriptions(isCancelled);
                
                const data = response?.data || response || [];
                // Data can be null according to edge cases
                if (isMounted) {
                    setSubscriptions(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || localization?.subscriptions_error_fetch || "Failed to fetch subscriptions.");
                    console.error("Dashboard fetch error:", err);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [filterStatus, localization]);

    const handleViewOrders = async (productId) => {
        setIsModalOpen(true);
        setOrdersLoading(true);
        setOrdersError(null);
        try {
            const response = await getSubscriptionOrders(productId);
            const data = response?.data || response || [];
            setSelectedOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            // Check for 404
            if (err?.response?.status === 404 || err?.statusCode === 404) {
                setOrdersError(localization?.subscriptions_no_orders || "No orders found for this subscription.");
                setSelectedOrders([]);
            } else {
                setOrdersError(err.message || localization?.subscriptions_orders_error || "Failed to fetch orders.");
            }
        } finally {
            setOrdersLoading(false);
        }
    };

    const columns = [
        {
            header: localization?.subscriptions_header_product || "Product",
            accessor: "productName",
            cellClassName: "text-text dark:text-white font-bold",
            cell: (row) => row.productName || row.name || "Subscription Product"
        },
        {
            header: localization?.subscriptions_header_status || "Status",
            cell: (row) => {
                const isActive = filterStatus === "Active";
                return (
                    <Badge variant={isActive ? "success" : "error"} dot>
                        {isActive ? (localization?.subscriptions_active || "Active") : (localization?.subscriptions_cancelled || "Cancelled")}
                    </Badge>
                );
            }
        },
        {
            header: localization?.subscriptions_header_price || "Price",
            cellClassName: "text-text dark:text-white font-medium",
            cell: (row) => formatPrice(row.price || row.amount || 0)
        },
        {
            header: localization?.subscriptions_header_date || "Start Date",
            cellClassName: "whitespace-nowrap",
            cell: (row) => {
                if (!row.startDate && !row.createdAt) return "-";
                const dateStr = formatDate(row.startDate || row.createdAt, 'date');
                return <span className="text-text/80 dark:text-white/80 font-medium">{dateStr}</span>;
            }
        },
        {
            header: localization?.subscriptions_header_action || "Action",
            className: "text-right pr-8",
            cellClassName: "text-right pr-8",
            cell: (row) => (
                <button
                    onClick={() => handleViewOrders(row.productId || row.id)}
                    className="inline-flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-bold tracking-wide transition-colors group-hover:underline decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer"
                >
                    {localization?.subscriptions_view_orders || "View Orders"}
                    <FaArrowRight className="text-[10px]" />
                </button>
            )
        }
    ];

    const totalItems = subscriptions.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedSubscriptions = subscriptions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    // Modal columns
    const orderColumns = [
        {
            header: localization?.order_history_header_date || "Date",
            cell: (row) => {
                if (!row.transactionDate && !row.date) return "-";
                const parts = formatDate(row.transactionDate || row.date, 'datetime').split(', ');
                return (
                    <div className="flex flex-col">
                        <span className="text-text/80 dark:text-white/80 font-medium">{parts[0]}</span>
                        {parts[1] && <span className="text-xs text-text/50">{parts[1]}</span>}
                    </div>
                );
            }
        },
        {
            header: localization?.order_history_header_invoice || "Invoice",
            cell: (row) => <span className="font-bold">{row.invoiceNumber || row.id || "-"}</span>
        },
        {
            header: localization?.order_history_header_total || "Total",
            cell: (row) => formatPrice(row.totalNetAmount || row.total || row.amount || 0)
        }
    ];

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title={localization?.subscriptions_title || "My Subscriptions"}
                    subtitle={localization?.subscriptions_subtitle || "Manage your subscriptions"}
                    action={
                        <div className="flex gap-2">
                            <div className="flex w-full sm:w-auto bg-surface-2 p-1 rounded-lg border border-divider">
                                <button
                                    onClick={() => { setFilterStatus("Active"); setCurrentPage(1); }}
                                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-bold rounded-md transition-all ${
                                        filterStatus === "Active"
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-text hover:text-primary"
                                    }`}
                                >
                                    {localization?.subscriptions_filter_active || "Active Subscriptions"}
                                </button>
                                <button
                                    onClick={() => { setFilterStatus("Cancelled"); setCurrentPage(1); }}
                                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-bold rounded-md transition-all ${
                                        filterStatus === "Cancelled"
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-text hover:text-primary"
                                    }`}
                                >
                                    {localization?.subscriptions_filter_cancelled || "Cancelled Subscriptions"}
                                </button>
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
                            data={paginatedSubscriptions}
                            pagination={pagination}
                            isLoading={isLoading}
                            emptyMessage={localization?.subscriptions_empty || "No subscriptions found."}
                        />
                    )}
                </div>
            </FaderInAnimation>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={localization?.subscriptions_orders_title || "Subscription Orders"}
                size="lg"
            >
                {ordersLoading ? (
                    <div className="py-8 text-center text-text/60">
                        {localization?.loading || "Loading orders..."}
                    </div>
                ) : ordersError ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                        {ordersError}
                    </div>
                ) : (
                    <div className="max-h-[60vh] overflow-y-auto">
                        <DataTable
                            columns={orderColumns}
                            data={selectedOrders}
                            emptyMessage={localization?.subscriptions_no_orders || "No orders found for this subscription."}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}
