"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaUserPlus, FaLink, FaShareAlt, FaWallet, FaShoppingCart, FaTags } from "react-icons/fa";

export default function RewardsClient({ localization }) {
    const steps = [
        {
            title: "Join the Partner Program",
            description: "First, you need to sign up for an account. Once logged in, navigate to your Dashboard and click on the 'Partner Program' section.",
            image: "/images/rewards/step-4.png",
            icon: <FaUserPlus className="text-4xl text-accent mb-4" />,
            direction: "left"
        },
        {
            title: "Get Your Unique Referral Code",
            description: "In your Partner dashboard, you will find your unique referral code. Copy this code to your clipboard.",
            image: "/images/rewards/step-2.png",
            icon: <FaLink className="text-4xl text-accent mb-4" />,
            direction: "right"
        },
        {
            title: "Share with Friends",
            description: "Share your referral code with your friends, family, or social media followers. Spread the word about our premium products!",
            image: "/images/rewards/step-3.png",
            icon: <FaShareAlt className="text-4xl text-accent mb-4" />,
            direction: "left"
        },
        {
            title: "Friends Apply Your Code",
            description: "When your friends shop, they simply enter your referral code in the 'Promo Code' or 'Referral Code' box during checkout to receive an instant affiliate discount on their order.",
            image: "/images/rewards/step-6.png",
            icon: <FaTags className="text-4xl text-accent mb-4" />,
            direction: "right"
        },
        {
            title: "Earn Wallet Balance",
            description: "Whenever someone makes a purchase using your referral code, you automatically earn a commission directly into your Wallet Balance!",
            image: "/images/rewards/step-1.png",
            icon: <FaWallet className="text-4xl text-accent mb-4" />,
            direction: "left"
        },
        {
            title: "Enjoy Affiliate Discounts",
            description: "On your next purchase, simply apply your available Wallet Balance at checkout to enjoy massive discounts on your own orders.",
            image: "/images/rewards/step-5.png",
            icon: <FaShoppingCart className="text-4xl text-accent mb-4" />,
            direction: "right"
        }
    ];

    return (
        <main>
            <PageHeader
                title="Rewards &"
                subtitle="Affiliate Program"
                pageKey="about"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Rewards Tutorial", href: null }
                ]}
            />

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <RevealInAnimation direction="up">
                            <h2 className="text-3xl md:text-5xl font-accent font-bold text-primary mb-6">
                                How It Works
                            </h2>
                            <p className="text-text/70 text-lg">
                                Follow these simple steps to start earning and redeeming your affiliate rewards.
                            </p>
                        </RevealInAnimation>
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => (
                            <RevealInAnimation key={index} direction={step.direction}>
                                <div className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-24`}>

                                    {/* Image Side */}
                                    <div className="w-full md:w-1/2">
                                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-700 p-4"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2">
                                        <div className="flex flex-col text-center md:text-left items-center md:items-start">
                                            <span className="text-accent font-bold text-xl mb-2 block">Step {index + 1}</span>
                                            {step.icon}
                                            <h3 className="text-3xl font-accent font-bold text-primary mb-4">{step.title}</h3>
                                            <p className="text-text/80 text-lg leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </RevealInAnimation>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-24 text-center">
                        <RevealInAnimation direction="up">
                            <div className="bg-primary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                                <h3 className="text-3xl md:text-4xl font-accent font-bold mb-6 relative z-10">Ready to start earning?</h3>
                                <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg relative z-10">
                                    Join our partner program today and turn your recommendations into real rewards.
                                </p>
                                <div className="relative z-10">
                                    <Link href="/dashboard/partner" className="block sm:inline-block">
                                        <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 md:px-12 rounded-full font-bold">
                                            Go to Partner Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </RevealInAnimation>
                    </div>

                </div>
            </section>
        </main>
    );
}
