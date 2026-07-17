import React from "react";
import Link from "next/link";

export default function PageHeader({ title, subtitle, breadcrumbs, bgImage, mobileBgImage, className = "min-h-[160px]", pageKey }) {
  // Mapping of page keys to specific background images
  const bgMapping = {
    "about": {
      bg: "/images/new/about us header banner copy.webp",
      mobile: "/images/new/about us mobile view banner.webp"
    },
    "contact": {
      bg: "/images/new/contact us banner.webp",
      mobile: "/images/new/contact us mobile view copy.webp"
    },
    "blog": {
      bg: "/images/new/blog page banner.webp",
      mobile: "/images/new/Blog listing mobile view.webp"
    },
    "privacy": {
      bg: "/images/new/blog page banner.webp",
      mobile: "/images/new/Blog listing mobile view.webp"
    },
    "terms": {
      bg: "/images/new/blog page banner.webp",
      mobile: "/images/new/Blog listing mobile view.webp"
    },
    "refund": {
      bg: "/images/new/blog page banner.webp",
      mobile: "/images/new/Blog listing mobile view.webp"
    },
    "faq": {
      bg: "/images/new/blog detail page banner.webp",
      mobile: "/images/new/blog detail page banner.webp"
    },
    "blog-detail": {
      bg: "/images/new/blog detail page banner.webp",
      mobile: "/images/new/Blog details mobile view.webp"
    },
    "certificates": {
      bg: "/images/new/blog page banner.webp",
      mobile: "/images/new/Blog listing mobile view.webp"
    },
    "certificate-detail": {
      bg: "/images/new/blog detail page banner.webp",
      mobile: "/images/new/Blog details mobile view.webp"
    },
  };

  const defaultMapping = bgMapping[pageKey?.toLowerCase()] || {};
  const activeBg = bgImage || defaultMapping.bg || "/images/page-header-bg.jpg";
  const activeMobileBg = mobileBgImage || defaultMapping.mobile || activeBg;

  // If no breadcrumbs are provided, fallback to default Home / {title}
  let displayBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title, href: null },
  ];

  // Filter out any breadcrumbs that don't have a label to prevent trailing separators
  displayBreadcrumbs = displayBreadcrumbs.filter(crumb => crumb && crumb.label);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .page-header-section { background-image: url('${activeMobileBg}'); }
        @media (min-width: 768px) { .page-header-section { background-image: url('${activeBg}'); } }
      `}} />
      <section
        className={`page-header-section bg-(--primary-color) ${className} flex justify-center items-center text-center bg-center bg-cover bg-no-repeat`}
      >
        <div className="container mx-auto px-4">
          <div className="page-header-box">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-default font-bold text-(--white-color)">
              {title}{" "}
              <span className="font-accent italic font-light">
                {subtitle}
              </span>
            </h1>

            {/* Breadcrumb */}
            <nav className="mt-6 flex justify-center" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm font-default text-(--white-color)/80">
                {displayBreadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <li className="opacity-60">/</li>}
                    <li>
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="hover:text-(--accent-color) transition"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-(--accent-color) font-semibold">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}