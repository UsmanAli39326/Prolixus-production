"use client";

import React from "react";
import { SUBSCRIPTION_COPY } from "@/constants/subscriptionCopy";

export default function SubscriptionHeader() {
  const { eyebrow, headline, subtext } = SUBSCRIPTION_COPY.header;

  return (
    <header className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--accent-color)/10 border border-(--accent-color)/20 mb-4">
        <span className="h-2 w-2 rounded-full bg-(--accent-color) animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-(--accent-color)">
          {eyebrow}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-accent text-(--primary-color) tracking-tight mb-4">
        {headline}
      </h1>
      <p className="text-base sm:text-lg text-(--text-color)/80 font-default leading-relaxed max-w-2xl mx-auto">
        {subtext}
      </p>
    </header>
  );
}
