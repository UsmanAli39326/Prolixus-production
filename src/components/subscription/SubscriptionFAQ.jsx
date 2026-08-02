"use client";

import React, { useState } from "react";
import { SUBSCRIPTION_COPY } from "@/constants/subscriptionCopy";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
        open ? "rotate-180 text-(--white-color)" : "rotate-0 text-(--primary-color)"
      }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SubscriptionFAQ({ copy, faqHeader }) {
  const faqs = copy || SUBSCRIPTION_COPY.faqs;
  const header = faqHeader || SUBSCRIPTION_COPY.faqHeader;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full my-12 lg:my-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-(--accent-color)/10 text-(--accent-color) border border-(--accent-color)/20">
            {header?.tag || "Frequently Asked Questions"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-accent text-(--primary-color) mt-3">
            {header?.heading || "Subscription & Ordering Answers"}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-(--divider-color) bg-(--white-color) shadow-xs"
              >
                <FaderInAnimation direction="up" delay={`${index * 0.08}s`}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className={`flex w-full items-center justify-between px-6 py-5 text-left transition-colors cursor-pointer ${
                      open
                        ? "bg-(--accent-color) text-(--white-color)"
                        : "bg-(--white-color) text-(--primary-color) hover:bg-gray-50"
                    }`}
                    aria-expanded={open}
                  >
                    <span className="text-base font-semibold pr-4">
                      {faq.question}
                    </span>
                    <Chevron open={open} />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    } ${open ? "bg-(--accent-color)" : "bg-(--white-color)"}`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-6 pb-6 text-sm sm:text-base leading-relaxed ${
                          open
                            ? "text-(--white-color)/95"
                            : "text-(--text-color)/85"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </FaderInAnimation>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
