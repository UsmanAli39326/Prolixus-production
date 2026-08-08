"use client";

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getTestimonialsCopy } from "@/constants/testimonialsCopy";
import { useLanguage } from "@/context/LanguageContext";
import { FaDroplet, FaFlask, FaLeaf, FaAward } from "react-icons/fa6";

function TestimonialThemeIcon({ iconKey, cardIndex }) {
  const defaultIcons = [FaDroplet, FaFlask, FaLeaf, FaAward];
  let IconComponent = FaDroplet;

  if (iconKey === "flask") IconComponent = FaFlask;
  else if (iconKey === "leaf") IconComponent = FaLeaf;
  else if (iconKey === "award") IconComponent = FaAward;
  else if (iconKey === "droplet") IconComponent = FaDroplet;
  else if (typeof cardIndex === "number") {
    IconComponent = defaultIcons[cardIndex % defaultIcons.length];
  }

  return <IconComponent className="h-5 w-5 text-(--accent-color)" />;
}

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

function ArrowBtn({ dir = "left", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10"
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function TestimonialCard({ t, cardIndex }) {
  return (
    <article className="flex flex-col justify-between h-full text-(--white-color)">
      <div>
        <StarRow />
        <p className="mt-4 text-[15px] leading-7 text-(--white-color)/90 font-default min-h-20">“{t.text}”</p>
      </div>
      <div>
        <div className="mt-6 h-px w-full bg-(--white-color)/12" />
        <div className="mt-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--accent-color)/15 border border-(--accent-color)/30 shadow-xs transition-transform duration-300 hover:scale-105">
              <TestimonialThemeIcon iconKey={t.icon} cardIndex={cardIndex} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-(--white-color) leading-tight font-default">{t.name}</h3>
              <p className="mt-0.5 text-[13px] text-(--white-color)/70 font-accent">{t.role}</p>
            </div>
          </div>
          <span className="text-3xl leading-none text-(--white-color)/90">”</span>
        </div>
      </div>
    </article>
  );
}

export default function OurTestimonials({ data = {} }) {
  const { language } = useLanguage();
  const perPage = 2;

  const copy = useMemo(() => getTestimonialsCopy(data, language), [data, language]);
  const testimonials = copy.items;

  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      out.push(testimonials.slice(i, i + perPage));
    }
    return out;
  }, [testimonials]);

  const total = pages.length;
  const [index, setIndex] = useState(0);

  // actual sliding: translate a track that contains ALL pages
  const viewportRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

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

      <div className="relative w-full px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
              <p className="font-serif text-sm italic text-(--white-color)/90">{copy.label}</p>
            </div>
            <RevealInAnimation >
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-(--white-color) sm:text-4xl lg:text-5xl font-default">
                {copy.title_main}{" "}
                <span className="block font-accent font-light italic">{copy.title_accent}</span>
              </h2>
            </RevealInAnimation>
          </div>

          <div className="flex items-center gap-6 lg:justify-end">
            <Image src="/images/google-img.svg" alt="Google" width={100} height={40} className="h-10 w-auto" />
            <span className="h-10 w-px bg-(--white-color)/15" />
            <div>
              <StarRow />
              <p className="mt-2 text-sm text-(--white-color)/70">{copy.happy_customers_text}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* Left image box */}
          <div className="w-full lg:w-[32%]">
            <FaderInAnimation direction="left" duration={0.6}>
              <div className="overflow-hidden rounded-[28px] bg-white/10">
                <Link href={data?.links?.testimonial || "/blog"} className="block w-full h-full group relative">
                  <Image
                    src="/images/new/Testimonials-copy.webp"
                    alt="Happy customers"
                    width={800}
                    height={800}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </div>
            </FaderInAnimation>
          </div>
          {/* Right slider */}
          <div className="w-full lg:w-[68%]">
            <FaderInAnimation direction="right" duration={0.6}>
              {/* viewport */}
              <div ref={viewportRef} className="overflow-hidden">
                {/* track: contains all pages side-by-side */}
                <div
                  className="flex transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {pages.map((page, pIdx) => (
                    <div
                      key={pIdx}
                      className="w-full shrink-0"
                      style={{ width: "100%" }}
                    >
                      <div className="grid gap-10 md:grid-cols-2">
                        {page.map((t, i) => (
                          <TestimonialCard key={i} t={t} cardIndex={pIdx * perPage + i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div className="mt-10 flex items-center justify-center gap-3">
                <ArrowBtn dir="left" onClick={prev} />
                <ArrowBtn dir="right" onClick={next} />
              </div>
            </FaderInAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}