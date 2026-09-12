"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SubscriptionFAQ from "@/components/subscription/SubscriptionFAQ";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getWalletData } from "@/lib/PartnerService";
import { getCustomerOrders } from "@/lib/OrderService";
import { getConductCopy } from "@/constants/conductCopy";
import {
    FaShoppingBag,
    FaShareAlt,
    FaGift,
    FaCopy,
    FaCheckCircle,
    FaLock,
    FaHeart,
    FaAward,
    FaChartLine
} from "react-icons/fa";

export default function RewardsClient({ localization }) {
    const { t } = useLanguage();
    const copy = getConductCopy(localization);
    const { isLoggedIn, loading: authLoading } = useAuth();

    const [referralCode, setReferralCode] = useState("");
    const [hasOrders, setHasOrders] = useState(false);
    const [isFetchingCode, setIsFetchingCode] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            setIsFetchingCode(true);
            Promise.allSettled([
                getWalletData(),
                getCustomerOrders()
            ])
                .then(([walletRes, ordersRes]) => {
                    if (walletRes.status === "fulfilled" && walletRes.value?.success && walletRes.value?.data) {
                        setReferralCode(walletRes.value.data.affiliateCode || "");
                    }
                    if (ordersRes.status === "fulfilled" && ordersRes.value?.data && Array.isArray(ordersRes.value.data)) {
                        setHasOrders(ordersRes.value.data.length > 0);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching referral data for CONDUCT page:", err);
                })
                .finally(() => {
                    setIsFetchingCode(false);
                });
        }
    }, [isLoggedIn]);

    const handleCopy = () => {
        if (!referralCode) return;
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // Step icons mapping for the 3 steps
    const stepIcons = [
        <FaShoppingBag key="step1" />,
        <FaShareAlt key="step2" />,
        <FaGift key="step3" />
    ];

    return (
        <main className="bg-(--secondary-color) min-h-screen font-default overflow-x-hidden">
            {/* Page Header */}
            <PageHeader
                title={localization?.conduct_header_title || t("conduct_header_title", "CONDUCT –")}
                subtitle={localization?.conduct_header_subtitle || t("conduct_header_subtitle", "Referral Program")}
                pageKey="conduct"
                breadcrumbs={[
                    { label: localization?.product_breadcrumb_home || t("product_breadcrumb_home", "Home"), href: "/" },
                    { label: "CONDUCT", href: null }
                ]}
            />

            {/* SECTION 1: HERO */}
            <section className="relative py-8 md:py-12 bg-(--white-color) bg-no-repeat bg-bottom-right border-b border-(--divider-color) overflow-hidden" style={{ backgroundImage: "url(/images/section-bg-shape-1.png)" }}>
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
                    <RevealInAnimation direction="up">
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <Badge variant="info" className="uppercase tracking-wider font-default max-w-full text-wrap break-words">
                                {copy.hero.eyebrow}
                            </Badge>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--primary-color) leading-tight">
                                {copy.hero.headline}
                            </h1>
                            <p className="text-sm sm:text-base text-(--text-color)/80 max-w-2xl mx-auto leading-relaxed">
                                {copy.hero.subtext}
                            </p>

                            <div className="pt-2 flex flex-col items-center justify-center gap-2.5">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                                    {isLoggedIn ? (
                                        <a href="#share-section" className="w-full sm:w-auto">
                                            <Button variant="accent" size="lg" className="w-full sm:w-auto px-7 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                                                {copy.hero.ctaLoggedin}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link href="/login?redirect=/conduct" className="w-full sm:w-auto">
                                            <Button variant="accent" size="lg" className="w-full sm:w-auto px-7 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                                                {copy.hero.ctaLoggedout}
                                            </Button>
                                        </Link>
                                    )}

                                    <a href="#how-it-works" className="w-full sm:w-auto">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-7 py-3 rounded-full font-semibold border-(--primary-color)/20 hover:border-(--accent-color)">
                                            {copy.hero.secondaryCta}
                                        </Button>
                                    </a>
                                </div>

                                {(!isLoggedIn || !hasOrders) && (
                                    <span className="text-xs text-(--text-color)/60 italic max-w-md text-center block pt-0.5">
                                        {copy.hero.ctaSubtext}
                                    </span>
                                )}
                            </div>
                        </div>
                    </RevealInAnimation>
                </div>
            </section>

            {/* SECTION 2: HOW IT WORKS / STEPS */}
            <section id="how-it-works" className="py-12 md:py-16 bg-(--secondary-color) overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                        <RevealInAnimation direction="up">
                            <Badge variant="info" className="uppercase tracking-wider font-default mb-3 max-w-full break-words">
                                {copy.stepsHeader.tag}
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--primary-color) mb-2 font-accent">
                                {copy.stepsHeader.title}
                            </h2>
                            <p className="text-sm sm:text-base text-(--primary-color)/75">
                                {copy.stepsHeader.subtitle}
                            </p>
                        </RevealInAnimation>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                        {copy.steps.map((step, index) => (
                            <RevealInAnimation key={index} direction="up" delay={index * 0.15}>
                                <div className="flex flex-col h-full bg-(--white-color) rounded-3xl p-6 sm:p-7 border border-(--divider-color) shadow-sm hover:shadow-md transition-all duration-300 group">

                                    {/* Image Side */}
                                    <div className="relative w-full rounded-2xl overflow-hidden bg-(--secondary-color) p-4 mb-6 aspect-[4/3] flex items-center justify-center border border-(--divider-color)/50">
                                        <Image
                                            src={step.image}
                                            alt={step.title}
                                            fill
                                            className="object-contain p-2 transform group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                        />
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex flex-col text-left flex-1 justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="primary" className="uppercase tracking-widest font-default">
                                                    {t("conduct_step_label", "Step")} {step.stepNumber}
                                                </Badge>
                                                <div className="icon-box flex h-7 w-7 items-center justify-center rounded-full bg-(--accent-color) text-(--white-color) text-xs shadow-xs">
                                                    {stepIcons[index]}
                                                </div>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-(--primary-color) mb-2 font-accent">
                                                {step.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-(--primary-color)/80 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </RevealInAnimation>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: PROGRESS TABLE (WITH STATSCARD STYLE HIGHLIGHT TIER) */}
            <section className="py-8 md:py-12 bg-(--white-color) overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="text-left max-w-2xl mb-6">
                        <RevealInAnimation direction="up">
                            <Badge variant="info" className="uppercase tracking-widest font-default mb-2">
                                {copy.table.tag}
                            </Badge>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-(--primary-color) mb-1">
                                {copy.table.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-(--primary-color)/75">
                                {copy.table.subtitle}
                            </p>
                        </RevealInAnimation>
                    </div>

                    <FaderInAnimation direction="up" delay={0.2}>
                        <div className="overflow-hidden rounded-xl border border-(--divider-color) bg-(--white-color) shadow-xs">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-(--primary-color) text-(--white-color) text-xs font-semibold tracking-wider border-b border-(--primary-color)/20">
                                            <th className="py-3 px-5">{copy.table.cols.referrals}</th>
                                            <th className="py-3 px-5">{copy.table.cols.reward}</th>
                                            <th className="py-3 px-5 text-right">{copy.table.cols.value}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--divider-color) text-xs sm:text-sm font-default">
                                        {copy.table.rows.map((row, idx) => (
                                            <tr
                                                key={idx}
                                                className={`transition-colors ${row.isHighlight
                                                    ? "bg-(--primary-color) text-white font-bold"
                                                    : idx % 2 === 0
                                                        ? "bg-(--white-color) hover:bg-(--secondary-color)/50"
                                                        : "bg-(--secondary-color)/40 hover:bg-(--secondary-color)/70"
                                                    }`}
                                            >
                                                <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-2 font-medium ${row.isHighlight ? "text-white" : "text-(--primary-color)"}`}>
                                                        <span className={`h-2 w-2 shrink-0 rounded-full bg-(--accent-color) inline-block`}></span>
                                                        {row.referrals}
                                                    </span>
                                                </td>
                                                <td className={`py-3.5 px-4 sm:px-5 font-bold whitespace-nowrap ${row.isHighlight ? "text-(--accent-color) text-base" : "text-(--accent-color)"}`}>
                                                    {row.reward}
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-5 text-right font-medium whitespace-nowrap">
                                                    {row.isHighlight ? (
                                                        <Badge variant="primary" className="bg-(--accent-color) text-(--primary-color) border-none font-bold text-xs">
                                                            <FaAward /> {row.value}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-(--primary-color)/80">{row.value}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FaderInAnimation>
                </div>
            </section>

            {/* SECTION 4: WARUM WIR EMPFEHLUNGEN BELOHNEN (STATSCARD STYLE CARD) */}
            <section className="py-8 md:py-12 bg-(--secondary-color) overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="group relative overflow-hidden rounded-2xl bg-(--primary-color) text-(--white-color) p-5 sm:p-8 lg:p-10 shadow-xl transition-all">
                        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-(--accent-color)/10 pointer-events-none" />
                        <div className="relative z-10 text-left space-y-3">
                            <Badge variant="info" className="bg-white/10 text-(--accent-color) border-white/20 uppercase tracking-widest font-default mb-1">
                                <FaHeart className="text-(--accent-color)" /> {copy.brand.tag}
                            </Badge>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-(--white-color)">
                                {copy.brand.title}
                            </h2>
                            <div className="space-y-2.5 text-white/85 text-xs sm:text-sm leading-relaxed text-left">
                                <p>{copy.brand.text1}</p>
                                <p>{copy.brand.text2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: SHARING SECTION */}
            <section id="share-section" className="py-8 md:py-12 bg-(--secondary-color) overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <FaderInAnimation direction="up">
                        <div className="bg-(--white-color) rounded-2xl p-6 sm:p-8 border border-(--divider-color) shadow-xs text-left space-y-4">
                            {isLoggedIn ? (
                                hasOrders ? (
                                    <>
                                        <div className="space-y-1">
                                            <h3 className="text-xl sm:text-2xl font-bold text-(--primary-color)">
                                                {copy.share.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-(--primary-color)/75">
                                                {copy.share.desc}
                                            </p>
                                        </div>

                                        <div className="pt-1 max-w-lg">
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-(--primary-color)/60 mb-1.5 text-left font-default">
                                                {copy.share.label}
                                            </label>
                                            <div className="flex flex-col sm:flex-row items-center gap-2.5">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={isFetchingCode ? "Wird geladen..." : (referralCode || "Code nicht verfügbar")}
                                                        className="w-full rounded-lg border border-(--divider-color) bg-(--secondary-color)/50 py-2.5 px-3.5 font-mono font-bold text-(--primary-color) text-xs sm:text-sm text-left focus:outline-none focus:border-(--accent-color)"
                                                    />
                                                </div>
                                                <Button
                                                    variant="accent"
                                                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg whitespace-nowrap font-bold text-xs sm:text-sm"
                                                    leftIcon={copied ? <FaCheckCircle /> : <FaCopy />}
                                                    onClick={handleCopy}
                                                    disabled={!referralCode || isFetchingCode}
                                                >
                                                    {copied ? copy.share.copied : copy.share.copy}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 rounded-full bg-(--accent-color)/15 flex items-center justify-center text-(--accent-color) text-lg">
                                                <FaLock />
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-(--primary-color)">
                                                {copy.share.noOrdersTitle || "Empfehlungslink nach Erstbestellung verfügbar"}
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-(--primary-color)/75">
                                            {copy.share.noOrdersDesc || "Dein persönlicher Empfehlungscode wird automatisch freigeschaltet, sobald du deine erste Bestellung getätigt hast."}
                                        </p>
                                        <div className="pt-1">
                                            <Link href="/products">
                                                <Button variant="accent" size="lg" className="px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xs">
                                                    {localization?.cart_start_shopping || "Jetzt bestellen"}
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-(--accent-color)/15 flex items-center justify-center text-(--accent-color) text-lg">
                                            <FaLock />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-(--primary-color)">
                                            {copy.share.loggedoutTitle}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-(--primary-color)/75">
                                        {copy.share.loggedoutDesc}
                                    </p>
                                    <div className="pt-1">
                                        <Link href="/login?redirect=/conduct">
                                            <Button variant="accent" size="lg" className="px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xs">
                                                {copy.hero.ctaLoggedout}
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </FaderInAnimation>
                </div>
            </section>

            {/* SECTION 6: FAQ ACCORDION (REUSING REUSABLE SubscriptionFAQ COMPONENT) */}
            <SubscriptionFAQ copy={copy.faqs} faqHeader={copy.faqHeader} />

            {/* BOTTOM CALLOUT CTA (STATSCARD STYLE CARD WITH LEFT ALIGNMENT) */}
            <section className="py-8 bg-(--secondary-color) border-t border-(--divider-color) overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <RevealInAnimation direction="up">
                        <div className="group relative overflow-hidden rounded-2xl bg-(--primary-color) text-(--white-color) p-6 sm:p-8 lg:p-10 shadow-xl text-left">
                            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-(--accent-color)/10 pointer-events-none" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                                <div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-(--white-color) mb-1.5">
                                        {copy.bottom.title}
                                    </h3>
                                    <p className="text-white/80 max-w-xl text-xs sm:text-sm">
                                        {copy.bottom.desc}
                                    </p>
                                </div>
                                <div className="shrink-0 w-full sm:w-auto">
                                    {isLoggedIn ? (
                                        <Link href="/dashboard/partner" className="block w-full sm:w-auto">
                                            <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 py-3 rounded-full font-bold uppercase tracking-wide text-xs sm:text-sm">
                                                {copy.bottom.btnLoggedin}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/login?redirect=/conduct" className="block w-full sm:w-auto">
                                            <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 py-3 rounded-full font-bold uppercase tracking-wide text-xs sm:text-sm">
                                                {copy.bottom.btnLoggedout}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </RevealInAnimation>
                </div>
            </section>
        </main>
    );
}
