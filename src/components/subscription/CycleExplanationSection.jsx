"use client";

import React from "react";
import Image from "next/image";
import { SUBSCRIPTION_COPY } from "@/constants/subscriptionCopy";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function CycleExplanationSection({ productImage, copy }) {
  const cycle = copy || SUBSCRIPTION_COPY.cycle;

  return (
    <section className="w-full my-12 lg:my-20 bg-(--primary-color) text-(--white-color) rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden">
      {/* Glow effect overlay */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-(--accent-color)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column: Text & Routine steps */}
        <div className="lg:col-span-7">
          <FaderInAnimation direction="left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-(--accent-color)/20 text-(--accent-color) mb-4 border border-(--accent-color)/30">
              {cycle.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-accent text-(--white-color) mb-3">
              {cycle.title}
            </h2>
            <p className="text-sm sm:text-base text-(--accent-color) font-medium mb-4">
              {cycle.subtitle}
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
              {cycle.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cycle.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold font-accent text-(--accent-color)">
                      {step.days}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-(--accent-color)/20 flex items-center justify-center text-(--accent-color) text-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    {step.label}
                  </h4>
                  <p className="text-xs text-gray-300">{step.detail}</p>
                </div>
              ))}
            </div>
          </FaderInAnimation>
        </div>

        {/* Right column: Image graphic from backend API */}
        <div className="lg:col-span-5 flex justify-center">
          <FaderInAnimation direction="right">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 flex items-center justify-center">
              {productImage ? (
                <Image
                  src={productImage}
                  alt="Prolixus 25+5 Intake Cycle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <i className="fa-solid fa-arrows-rotate text-5xl text-(--accent-color) mb-3" />
                  <span className="text-sm font-bold text-white">25+5 Routine</span>
                </div>
              )}
            </div>
          </FaderInAnimation>
        </div>
      </div>
    </section>
  );
}
