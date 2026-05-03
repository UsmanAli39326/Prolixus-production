"use client";
import React, { useState, useEffect } from "react";
import {
    FaChevronRight,
    FaWallet,
    FaUsers,
    FaChartLine,
    FaLink,
    FaCopy,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { getWalletData } from "@/lib/PartnerService";
import { MdRefresh, MdErrorOutline } from "react-icons/md";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/utitlis/formatters";

// // const mockCommissions = [
// //     {
// //         id: "#ORD-9923",
// //         date: "Oct 24, 2023",
// //         status: "Completed",
// //         earnings: "$128.50",
// //         variant: "success",
// //     },
// //     {
// //         id: "#ORD-9841",
// //         date: "Oct 22, 2023",
// //         status: "Pending",
// //         earnings: "$45.00",
// //         variant: "warning",
// //     },
// //     {
// //         id: "#ORD-9755",
// //         date: "Oct 18, 2023",
// //         status: "Completed",
// //         earnings: "$212.00",
// //         variant: "success",
// //     },
// //     {
// //         id: "#ORD-9630",
// //         date: "Oct 15, 2023",
// //         status: "Canceled",
// //         earnings: "$85.00",
// //         variant: "error",
// //         canceled: true
// //     },
// ];

const StatsCard = ({ title, value, trend, detail, icon: Icon }) => (
    <div className="group relative overflow-hidden rounded-xl bg-primary p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-accent/10"></div>
        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
                <span className="font-accent text-sm font-medium text-white/80 uppercase tracking-wider">{title}</span>
                <Icon className="text-accent/80 text-xl" />
            </div>
            <div>
                <div className="text-3xl font-bold text-accent">{value}</div>
                <div className="mt-2 flex items-center gap-1 text-xs text-white/60">
                    {/* <MdTrendingUp className="text-sm text-green-400" /> */}
                    <span className="text-green-400 font-medium">{trend}</span>
                    <span>{detail}</span>
                </div>
            </div>
        </div>
    </div>
);

export default function PartnerProgramPage() {
    const [walletData, setWalletData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const { formatPrice } = useCurrency();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getWalletData();
            if (response.success) {
                setWalletData(response.data);
            } else {
                setError(response.message || "Failed to fetch wallet data.");
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const referralLink = walletData?.affiliateCode || "";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const columns = [
        {
            header: "Date & Time",
            cellClassName: "whitespace-nowrap",
            cell: (row) => {
                const parts = row.date.split(', ');
                return (
                    <div className="flex flex-col">
                        <span className="text-text/80 dark:text-white/80 font-medium">{parts[0]}</span>
                        {parts[1] && <span className="text-xs text-text/50">{parts[1]}</span>}
                    </div>
                );
            }
        },
        {
            header: "Invoice No",
            accessor: "id",
            cellClassName: "text-text/60 dark:text-white/60 font-mono text-xs"
        },
        {
            header: "Customer",
            accessor: "customer",
            cellClassName: "text-text/80 dark:text-white/80 font-medium"
        },
        {
            header: "Rate",
            accessor: "rate",
            className: "text-center",
            cellClassName: "text-center text-text/60 dark:text-white/60"
        },
        {
            header: "Order Status",
            cell: (row) => (
                row.orderStatus !== "-" ? (
                    <Badge variant={
                        row.orderStatus === "Completed" ? "success" :
                            row.orderStatus === "Pending" ? "warning" :
                                row.orderStatus === "Canceled" ? "error" : "info"
                    }>
                        {row.orderStatus}
                    </Badge>
                ) : <span className="text-text/20">-</span>
            )
        },
        {
            header: "Transaction",
            cell: (row) => (
                <Badge variant={row.variant}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: "Amount",
            className: "text-right",
            cellClassName: "text-right font-bold text-text dark:text-white",
            cell: (row) => (
                <span className={row.canceled ? "text-text/40 line-through" : ""}>
                    {row.earnings}
                </span>
            )
        }
    ];

    const allEntries = walletData?.walletEntries || [];
    const totalItems = allEntries.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedEntries = allEntries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
                <p className="text-text/60 animate-pulse">Loading partner details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                    <MdErrorOutline className="text-5xl text-red-500" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-text">Something went wrong</h3>
                    <p className="mt-2 text-text/60 max-w-md">{error}</p>
                </div>
                <Button
                    variant="primary"
                    leftIcon={<MdRefresh />}
                    onClick={fetchData}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Header */}
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title="Partner Program"
                    subtitle="Track your impact, monitor earnings, and grow your organic community."
                >
                </DashboardHeader>
            </RevealInAnimation>

            {/* Stats Grid */}
            <FaderInAnimation direction="up" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title="Total Affiliate Amount"
                        value={formatPrice(walletData?.totalAffiliateAmount || 0)}
                        // trend="+0%"
                        // detail="Lifetime earnings"
                        icon={FaWallet}
                    />
                    <StatsCard
                        title="Amount Used"
                        value={formatPrice(walletData?.totalAffiliateAmountUsedInOrders || 0)}
                        // trend="0"
                        // detail="Used in orders"
                        icon={FaUsers}
                    />
                    <StatsCard
                        title="Wallet Balance"
                        value={formatPrice(walletData?.remainingAffiliateAmount || 0)}
                        // trend="Live"
                        // detail="Available for use"
                        icon={FaChartLine}
                    />
                </div>
            </FaderInAnimation>

            {/* Referral Link Box */}
            <FaderInAnimation direction="up" delay={0.4}>
                <div className="rounded-2xl bg-white dark:bg-background-dark/30 border border-divider p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-text mb-1">Your Referral Code </h3>
                            <p className="text-sm text-text/60">Share this Code with your audience to earn commissions on every sale.</p>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-full lg:w-[320px]">
                                <input
                                    className="w-full rounded-lg border border-divider bg-secondary/20 dark:bg-white/5 py-3 pl-4 pr-12 text-sm font-medium text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                    readOnly
                                    type="text"
                                    value={referralLink}
                                />
                                <FaLink className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40" />
                            </div>
                            <Button
                                className="w-full sm:w-auto whitespace-nowrap"
                                variant="primary"
                                leftIcon={copied ? <FaCheckCircle /> : <FaCopy />}
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </div>
                </div>
            </FaderInAnimation>

            {/* Commissions Table */}
            <FaderInAnimation direction="up" delay={0.6}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-primary font-accent">Transaction History</h3>
                    </div>
                    {allEntries.length > 0 ? (
                        <DataTable
                            columns={columns}
                            data={paginatedEntries.map(entry => {
                                const isEarnings = entry.transactionType === 1 || (entry.affiliatePercentageAmount > 0 || entry.affiliateAbsoluteAmount > 0);
                                const totalAmount = (entry.totalAffiliateAmount ?? (entry.affiliatePercentageAmount + (entry.affiliateAbsoluteAmount || 0))) || 0;

                                return {
                                    id: entry.orderInvoiceNumber ? `#${entry.orderInvoiceNumber}` : (entry.invoiceNumber ? `#${entry.invoiceNumber}` : (entry.orderId ? `#ORD-${entry.orderId}` : (entry.id ? `#TRX-${entry.id}` : "N/A"))),
                                    date: formatDate(entry.createdDateTime || entry.transactionDate, 'datetime'),
                                    customer: entry.customerName || "-",
                                    rate: entry.affiliatePercentage > 0 ? `${entry.affiliatePercentage}%` : (entry.affiliateAbsoluteAmount > 0 ? formatPrice(entry.affiliateAbsoluteAmount) : "-"),
                                    orderStatus: entry.orderStatus || "-",
                                    status: isEarnings ? "Earnings" : "Used",
                                    earnings: formatPrice(totalAmount),
                                    variant: isEarnings ? "success" : "info",
                                    canceled: entry.orderStatus === "Canceled",
                                };
                            })}
                            pagination={pagination}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-background-dark/30 rounded-2xl border border-divider">
                            <FaExclamationTriangle className="text-4xl text-text/20 mb-4" />
                            <p className="text-text/60 font-medium">No wallet transactions available.</p>
                        </div>
                    )}
                </div>
            </FaderInAnimation>

            {/* Footer Links */}
            <FaderInAnimation direction="up" delay={0.8}>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-text/50">
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="/terms">Terms & Conditions</a>
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="#">Payout Settings</a>
                    <a className="hover:text-accent transition-colors underline decoration-divider underline-offset-4" href="#">Contact Support</a>
                </div>
            </FaderInAnimation>
        </div>
    );
}
