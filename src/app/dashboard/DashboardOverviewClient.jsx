"use client";
import { useState, useEffect } from "react";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

import RecentOrderSection from "@/components/layout/Dashboard/OverView/RecentOrderSection";
import QuickActionsSection from "@/components/layout/Dashboard/OverView/QuickActionsSection";
import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import { getProfile } from "@/lib/ProfileService";
import { getCustomerOrders } from "@/lib/OrderService";
import { getWalletData } from "@/lib/PartnerService";
import Button from "@/components/ui/Button";
import { FaCopy, FaCheckCircle, FaLink, FaWallet, FaShoppingBag, FaChartBar } from "react-icons/fa";
import { useCurrency } from "@/context/CurrencyContext";

const StatCard = ({ title, value, icon: Icon, color = "accent" }) => (
    <div className="bg-white dark:bg-background-dark/30 rounded-2xl p-6 shadow-sm border border-divider flex items-center gap-5 transition-all hover:shadow-md group">
        <div className={`p-4 rounded-xl bg-${color}/10 text-${color} group-hover:bg-${color} group-hover:text-white transition-colors duration-300`}>
            <Icon className="text-2xl" />
        </div>
        <div>
            <p className="text-sm text-text/60 font-medium uppercase tracking-wider mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-primary">{value}</h4>
        </div>
    </div>
);

export default function DashboardOverviewPage({ localization }) {
    const { formatPrice } = useCurrency();
    const [user, setUser] = useState({ name: "" });
    const [stats, setStats] = useState({
        totalOrders: 0,
        walletBalance: 0,
        totalEarnings: 0,
    });
    const [walletData, setWalletData] = useState(null);
    const [recentOrder, setRecentOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (walletData?.affiliateCode) {
            navigator.clipboard.writeText(walletData.affiliateCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [profileRes, ordersRes, walletRes] = await Promise.allSettled([
                    getProfile(),
                    getCustomerOrders(),
                    getWalletData()
                ]);

                let newStats = { ...stats };
                let newUser = { ...user };
                let newRecentOrder = null;

                if (profileRes.status === 'fulfilled' && profileRes.value?.data) {
                    newUser.name = profileRes.value.data.name;
                }

                if (ordersRes.status === 'fulfilled' && ordersRes.value?.data && Array.isArray(ordersRes.value.data)) {
                    newStats.totalOrders = ordersRes.value.data.length;
                    if (ordersRes.value.data.length > 0) {
                        const firstEntry = ordersRes.value.data[0];
                        newRecentOrder = firstEntry.order || firstEntry;
                    }
                }

                if (walletRes.status === 'fulfilled' && walletRes.value?.data) {
                    setWalletData(walletRes.value.data);
                    newStats.walletBalance = walletRes.value.data.remainingAffiliateAmount || 0;
                    newStats.totalEarnings = walletRes.value.data.totalAffiliateAmount || 0;
                }

                setUser(newUser);
                setStats(newStats);
                setRecentOrder(newRecentOrder);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-8 md:gap-10">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title={`${localization?.dashboard_welcome_back} ${user.name}`}
                    subtitle={localization?.dashboard_summary_subtitle}
                />
            </RevealInAnimation>

            {/* Stats Grid */}
            <FaderInAnimation direction="up" delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        title={localization?.dashboard_total_orders}
                        value={loading ? "..." : stats.totalOrders}
                        icon={FaShoppingBag}
                        color="primary"
                    />
                    <StatCard
                        title={localization?.dashboard_wallet_balance}
                        value={loading ? "..." : formatPrice(stats.walletBalance)}
                        icon={FaWallet}
                        color="accent"
                    />
                    <StatCard
                        title={localization?.dashboard_total_earnings}
                        value={loading ? "..." : formatPrice(stats.totalEarnings)}
                        icon={FaChartBar}
                        color="primary"
                    />
                </div>
            </FaderInAnimation>

            <div className="flex flex-col gap-8">
                <FaderInAnimation direction="up" delay={0.2}>
                    <RecentOrderSection order={recentOrder} loading={loading} localization={localization} />
                </FaderInAnimation>

                {/* Referral Program Bar */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <section>
                        <h2 className="text-xl font-accent text-primary mb-4">{localization?.dashboard_referral_rewards}</h2>
                        <div className="bg-white dark:bg-background-dark/30 rounded-2xl p-6 shadow-sm border border-divider flex flex-col xl:flex-row gap-6 xl:items-center justify-between group hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-1">
                                <div className="p-4 bg-accent/10 rounded-xl text-accent">
                                    <FaLink className="text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-primary font-default block leading-none mb-1">
                                        {localization?.dashboard_referral_program}
                                    </h3>
                                    <p className="text-text/60 text-sm font-default">
                                        {localization?.dashboard_referral_desc}
                                    </p>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <input
                                        className="w-full rounded-xl border border-divider bg-secondary/30 dark:bg-white/5 py-2.5 pl-4 pr-10 text-sm font-bold text-primary focus:border-accent outline-none transition-all"
                                        readOnly
                                        type="text"
                                        value={loading ? "..." : (walletData?.affiliateCode || "No code")}
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-accent transition-colors"
                                    >
                                        {copied ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="px-8 rounded-xl"
                                    href="/dashboard/partner"
                                >
                                    {localization?.dashboard_manage_referrals}
                                </Button>
                            </div>
                        </div>
                    </section>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.4}>
                    <QuickActionsSection stats={stats} loading={loading} localization={localization} />
                </FaderInAnimation>
            </div>
        </div>
    );
}