"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    FaArrowLeft,
    FaBagShopping,
    FaPrint,
} from "react-icons/fa6";

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Button from "@/components/ui/Button";
import { getOrderDetails, getOrderInvoiceHtml } from "@/lib/OrderService";

export default function OrderDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [invoiceHtml, setInvoiceHtml] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const iframeRef = useRef(null);

    const orderId = searchParams.get("orderId");

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                setLoading(true);

                // First get order details to retrieve invoice number
                let invoiceNumber = null;

                if (orderId) {
                    const orderResponse = await getOrderDetails(orderId);
                    if (orderResponse?.success && orderResponse.data) {
                        invoiceNumber = orderResponse.data?.order?.invoiceNumber || orderResponse.data?.order?.id;
                    } else if (orderResponse?.data) {
                        invoiceNumber = orderResponse.data?.order?.invoiceNumber || orderResponse.data?.order?.id;
                    }
                } else {
                    // Try sessionStorage fallback
                    try {
                        const stored = sessionStorage.getItem("orderData");
                        if (stored) {
                            const parsed = JSON.parse(stored);
                            invoiceNumber = parsed?.order?.invoiceNumber || parsed?.order?.id;
                            sessionStorage.removeItem("orderData");
                        }
                    } catch {
                        // ignore parse errors
                    }
                }

                if (!invoiceNumber) {
                    setError("No invoice number found.");
                    return;
                }

                // Fetch invoice HTML (base64)
                // API returns: { success, data: { invoiceHtmlBase64: "..." } }
                const invoiceResponse = await getOrderInvoiceHtml(invoiceNumber);

                const base64Html = invoiceResponse?.data?.invoiceHtmlBase64;

                if (!base64Html) {
                    setError("Failed to load invoice.");
                    return;
                }

                // Decode base64 to HTML string
                const decodedHtml = atob(base64Html);
                setInvoiceHtml(decodedHtml);

            } catch (err) {
                console.error("Fetch invoice error:", err);
                setError(err.message || "An error occurred while fetching the invoice.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [orderId]);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // Write HTML to iframe once loaded
    useEffect(() => {
        if (invoiceHtml && iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(invoiceHtml);
            doc.close();

            // Auto-resize iframe to fit content
            const resizeIframe = () => {
                try {
                    const body = doc.body;
                    const html = doc.documentElement;
                    const height = Math.max(
                        body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight
                    );
                    iframe.style.height = height + 40 + "px";
                } catch (e) {
                    iframe.style.height = "800px";
                }
            };

            // Resize after content loads (including images/fonts)
            iframe.contentWindow.addEventListener("load", resizeIframe);
            // Also try after a short delay for dynamic content
            setTimeout(resizeIframe, 500);
            setTimeout(resizeIframe, 1500);
        }
    }, [invoiceHtml]);

    const handlePrint = () => {
        if (!invoiceHtml) return;

        // Open a new window with only the invoice HTML and print it
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(invoiceHtml);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <p className="text-lg sm:text-xl text-text/80 font-medium animate-pulse">
                    Loading invoice...
                </p>
            </div>
        );
    }

    if (error || !invoiceHtml) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-5 sm:gap-6">
                <p className="text-lg sm:text-xl text-red-500 font-medium wrap-break-word">
                    {error || "No invoice found."}
                </p>
                <Link href="/products" className="w-full sm:w-auto">
                    <Button variant="accent" size="lg" className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl">
                        Go to Shop
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#f8f9fa] px-4 sm:px-6 py-8 pt-24 sm:pt-28 flex flex-col items-center">

            {/* TOP ACTIONS */}
            <div className="w-full flex justify-center print:hidden">
                <FaderInAnimation>
                    <div className="w-full max-w-[1400px] mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Button
                            onClick={() => router.push("/dashboard")}
                            variant="outline"
                            size="sm"
                            leftIcon={<FaArrowLeft size={14} />}
                            className="w-full sm:w-auto rounded-lg border-2 border-divider font-bold hover:bg-secondary/50 transition-all shadow-sm"
                        >
                            Dashboard
                        </Button>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                size="sm"
                                leftIcon={<FaPrint size={14} />}
                                className="w-full sm:w-auto rounded-lg border-2 border-divider font-bold hover:bg-secondary/50 transition-all shadow-sm"
                            >
                                Print Invoice
                            </Button>
                            <Link href="/products" className="w-full sm:w-auto">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    leftIcon={<FaBagShopping size={14} />}
                                    className="w-full sm:w-auto rounded-lg shadow-md hover:scale-105 transition-all font-bold"
                                >
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </FaderInAnimation>
            </div>

            {/* INVOICE IFRAME */}
            <div className="w-full max-w-[1400px] mx-auto">
                <iframe
                    ref={iframeRef}
                    title="Invoice"
                    className="w-full border-none"
                    style={{ minHeight: "600px" }}
                    sandbox="allow-same-origin allow-popups"
                />
            </div>
        </div>
    );
}