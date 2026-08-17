"use client";

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { getTestimonialsCopy } from "@/constants/testimonialsCopy";
import { useLanguage } from "@/context/LanguageContext";

function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4 text-(--accent-color)"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="w-full h-full p-6 sm:p-8 bg-[#090d16] rounded-2xl flex flex-col justify-between animate-pulse border border-white/10">
      <div className="space-y-5">
        {/* Header avatar + name */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-white/15 shrink-0" />
          <div className="space-y-2">
            <div className="w-36 h-4 rounded bg-white/15" />
            <div className="w-24 h-3 rounded bg-white/10" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 py-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded bg-white/15" />
          ))}
        </div>

        {/* Review body lines */}
        <div className="space-y-3 pt-1">
          <div className="w-full h-3.5 rounded bg-white/15" />
          <div className="w-11/12 h-3.5 rounded bg-white/15" />
          <div className="w-4/5 h-3.5 rounded bg-white/10" />
          <div className="w-3/4 h-3.5 rounded bg-white/10" />
          <div className="w-1/2 h-3.5 rounded bg-white/10" />
        </div>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="w-32 h-4 rounded bg-white/15" />
        <div className="w-6 h-6 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

export default function OurTestimonials({ data = {} }) {
  const { language } = useLanguage();
  const copy = useMemo(() => getTestimonialsCopy(data, language), [data, language]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-(--primary-color) py-16 sm:py-20">
      {/* dotted background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
              <p className="font-serif text-sm italic text-(--white-color)/90">{copy.label}</p>
            </div>
            <RevealInAnimation>
              <h2 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-(--white-color) md:text-4xl lg:text-5xl font-default">
                {copy.title_main}{" "}
                <span className="block font-accent font-light italic">{copy.title_accent}</span>
              </h2>
            </RevealInAnimation>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:justify-end">
            <Image src="/images/google-img.svg" alt="Google" width={100} height={40} className="h-8 sm:h-10 w-auto" />
            <span className="h-8 sm:h-10 w-px bg-(--white-color)/15" />
            <div>
              <StarRow />
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-(--white-color)/70">{copy.happy_customers_text}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center">
          {/* Left image box */}
          <div className="w-full lg:w-[32%]">
            <FaderInAnimation direction="left" duration={0.6}>
              <div className="overflow-hidden rounded-[20px] sm:rounded-[28px] bg-white/10 h-[250px] sm:h-[330px] lg:h-[485px]">
                <Link href={data?.links?.testimonial || "/blog"} className="block w-full h-full group relative">
                  <Image
                    src="/images/new/Testimonials-copy.webp"
                    alt="Happy customers"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <span className="text-white font-bold text-base sm:text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </div>
            </FaderInAnimation>
          </div>

          {/* Right side Google Reviews iframe */}
          <div className="w-full lg:w-[68%]">
            <FaderInAnimation direction="right" duration={0.6}>
              <div
                className="relative w-full h-[575px] sm:h-[525px] lg:h-[485px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-[#090d16]"
              >
                {isLoading && (
                  <div className="absolute inset-0 z-10 overflow-hidden">
                    <ReviewSkeleton />
                  </div>
                )}
                <iframe
                  src="https://widgets.sociablekit.com/google-reviews/iframe/25705668"
                  frameBorder="0"
                  scrolling="no"
                  width="100%"
                  className="w-full h-[calc(100%+35px)] border-0 rounded-2xl"
                  style={{ overflow: "hidden" }}
                  title="Google Reviews"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </FaderInAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}