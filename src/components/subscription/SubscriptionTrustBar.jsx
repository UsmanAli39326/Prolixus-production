"use client";

import React from "react";
import { SUBSCRIPTION_COPY } from "@/constants/subscriptionCopy";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function SubscriptionTrustBar({ copy }) {
  const pillars = copy || SUBSCRIPTION_COPY.trustPillars;

  return (
    <section className="w-full my-12 lg:my-16">
      <div className="mx-auto max-w-6xl px-4">
        <FaderInAnimation direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-center text-center p-6 bg-(--white-color) rounded-2xl border border-(--divider-color) shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-(--accent-color)/10 text-(--accent-color) flex items-center justify-center text-2xl mb-4 border border-(--accent-color)/20">
                  <i className={pillar.icon} />
                </div>
                <h3 className="text-base font-bold text-(--primary-color) mb-2 font-default">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-(--text-color)/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </FaderInAnimation>
      </div>
    </section>
  );
}
