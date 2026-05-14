"use client";

import { useState } from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

function Chevron() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqsClient({ faqs }) {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center">
        <p className="text-text/60">No FAQs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${
              isOpen
                ? "border-accent/30 bg-white shadow-xl ring-1 ring-accent/10"
                : "border-divider bg-white/40 backdrop-blur-sm hover:bg-white hover:shadow-md hover:border-accent/20"
            }`}
          >
            <FaderInAnimation direction="up">
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="flex w-full items-center justify-between px-6 py-6 text-left transition-all duration-300"
              >
                <span
                  className={`text-lg font-bold font-accent transition-colors duration-300 leading-snug pr-8 ${
                    isOpen ? "text-accent" : "text-primary"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen ? "bg-accent text-white rotate-180" : "bg-secondary text-primary group-hover:bg-accent group-hover:text-white"
                  }`}
                >
                  <Chevron />
                </div>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className="px-6 pb-8 text-base leading-relaxed text-text/80 dynamic-content-wrapper border-t border-divider/50 pt-4 mt-2"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </FaderInAnimation>
          </div>
        );
      })}
    </div>
  );
}
