"use client";

import React from "react";
import { SUBSCRIPTION_COPY } from "@/constants/subscriptionCopy";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import {
  FaIndustry,
  FaMicroscope,
  FaCertificate,
  FaPrescriptionBottleMedical,
} from "react-icons/fa6";

const ICON_MAP = {
  manufacturing: FaIndustry,
  "two-stage": FaMicroscope,
  "externally-verified": FaCertificate,
  "pzn-listed": FaPrescriptionBottleMedical,
  "fa-industry": FaIndustry,
  "fa-microscope": FaMicroscope,
  "fa-certificate": FaCertificate,
  "fa-prescription-bottle-medical": FaPrescriptionBottleMedical,
};

const DEFAULT_ICONS = [
  FaIndustry,
  FaMicroscope,
  FaCertificate,
  FaPrescriptionBottleMedical,
];

export default function SubscriptionTrustBar({ copy }) {
  const pillars = copy || SUBSCRIPTION_COPY.trustPillars;

  return (
    <section className="w-full my-12 lg:my-16">
      <div className="mx-auto max-w-6xl px-4">
        <FaderInAnimation direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const iconKey = pillar.id || (pillar.icon ? pillar.icon.replace("fa-solid ", "") : "");
              const IconComponent =
                ICON_MAP[iconKey] ||
                ICON_MAP[pillar.id] ||
                DEFAULT_ICONS[index % DEFAULT_ICONS.length];

              return (
                <div
                  key={pillar.id || index}
                  className="flex flex-col items-center text-center p-6 bg-(--white-color) rounded-2xl border border-(--divider-color) shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-(--accent-color)/10 text-(--accent-color) flex items-center justify-center text-2xl mb-4 border border-(--accent-color)/20 shrink-0">
                    <IconComponent />
                  </div>
                  <h3 className="text-base font-bold text-(--primary-color) mb-2 font-default">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-(--text-color)/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </FaderInAnimation>
      </div>
    </section>
  );
}
