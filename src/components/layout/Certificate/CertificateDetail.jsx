import Link from "next/link";
import Image from "next/image";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { formatDate } from "@/utitlis/formatters";

export default function CertificateDetail({ certificate, localization }) {
    return (
        <div className="certificate-detail-page pt-16 pb-24 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main Layout: Article style like Blog */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* ── Article ── */}
                        <article className="flex-1 min-w-0 max-w-5xl mx-auto w-full overflow-hidden">
                            {/* Back to Certificates link (Top) - Optional depending on if there is a listing page */}
                            {/* We point it to / for now or a /certificates page if it exists */}
                            <FaderInAnimation direction="up" delay={0} duration={0.6}>
                                <div className="mb-6">
                                    <Link
                                        href="/certificates"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-(--accent-color) hover:text-(--primary-color) transition-colors duration-200"
                                    >
                                        <i className="fa-solid fa-arrow-left text-xs" />
                                        {localization?.certificates_breadcrumb || "Back to Certificates"}
                                    </Link>
                                </div>
                            </FaderInAnimation>

                            {/* Meta Date */}
                            {certificate?.createdDate && (
                                <FaderInAnimation direction="up" delay={0} duration={0.6}>
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="flex items-center gap-1.5 text-sm text-(--text-color)/55">
                                            <i className="fa-solid fa-calendar-days text-(--accent-color)" />
                                            {formatDate(certificate.createdDate, 'date')}
                                        </span>
                                    </div>
                                </FaderInAnimation>
                            )}

                            {/* Title */}
                            <RevealInAnimation direction="left" delay={0.1} duration={0.8}>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-default text-(--primary-color) leading-tight mb-8 break-words">
                                    {certificate?.title}
                                </h1>
                            </RevealInAnimation>

                            {/* Hero image */}
                            {certificate?.imageUrl && (
                                <FaderInAnimation direction="up" delay={0.2} duration={0.8}>
                                    <figure className="relative mb-10 overflow-hidden rounded-2xl shadow-lg w-full">
                                        <Image
                                            src={certificate.imageUrl}
                                            alt={certificate.title || "Certificate"}
                                            width={1200}
                                            height={800}
                                            unoptimized={true}
                                            className="w-full h-auto block object-contain max-h-[800px]"
                                        />
                                    </figure>
                                </FaderInAnimation>
                            )}

                            {/* Excerpt lead */}
                            {certificate?.shortDescription && (
                                <FaderInAnimation direction="up" delay={0.1} duration={0.7}>
                                    <p className="mb-8 text-lg font-medium text-(--primary-color)/80 leading-relaxed border-l-4 border-(--accent-color) pl-5 break-words">
                                        {certificate.shortDescription}
                                    </p>
                                </FaderInAnimation>
                            )}

                            {/* Body content */}
                            {certificate?.description && (
                                <div 
                                    dangerouslySetInnerHTML={{ __html: certificate.description }} 
                                    className="dynamic-content-wrapper break-words overflow-hidden" 
                                />
                            )}

                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
