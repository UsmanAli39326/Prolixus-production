"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";
import Image from "next/image";
import { getLocalization } from "@/lib/getLocalization";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [localization, setLocalization] = useState(null);

    useEffect(() => {
        const fetchLocalization = async () => {
            const data = await getLocalization();
            setLocalization(data);
        };
        fetchLocalization();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const value = email.trim();

        if (!value) {
            setError(localization?.error_email_required || "Please enter your email address");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError(localization?.error_email_invalid || "Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            await apiService.post("/Account/forgot-password", { email: value });

            // Redirect to unified OTP verification page
            router.push(`/verify-otp?email=${encodeURIComponent(value)}&type=reset`);
        } catch (err) {
            setError(err.message || localization?.error_verification_code_failed || "Failed to send verification code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FaderInAnimation direction="up">
            <div className="flex items-center justify-center p-4 bg-secondary mt-10 h-screen ">
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                        {/* LEFT: Image panel */}
                        <div className="relative hidden lg:block">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('/images/new/forget page copy.webp')" }}
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-black/75" />

                            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Link href="/" className="flex-shrink-0">
                                        <Image
                                            src="/images/new/logo-full.gif"
                                            alt="Prolixus Logo"
                                            width={200}
                                            height={56}
                                            className="h-14 w-auto object-contain"
                                        />
                                    </Link>
                                    <div className="leading-tight">
                                        <div className="text-white font-semibold tracking-wide">{localization?.brandname || "Prolixus"}</div>
                                        <div className="text-white/70 text-xs">{localization?.sign_in}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-7 left-7 right-7">
                                <div className="text-white text-2xl font-semibold leading-snug font-accent">
                                    {localization?.help_account}
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    {localization?.recovery_account}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Form panel */}
                        <div className="flex items-center justify-center p-8 sm:p-12">
                            <div className="w-full max-w-md">

                                <div className="lg:hidden mb-8">
                                    <div className="flex items-center gap-3">
                                        <Link href="/" className="flex-shrink-0">
                                            <Image
                                                src="/images/new/logo-full.gif"
                                                alt="Prolixus Logo"
                                                width={160}
                                                height={45}
                                                className="h-12 w-auto object-contain"
                                            />
                                        </Link>
                                        <div>
                                            <div className="font-accent text-2xl text-primary">{localization?.brandname || "Prolixus"}</div>
                                            <div className="text-sm text-text">{localization?.sign_in}</div>
                                        </div>
                                    </div>
                                </div>



                                <h1 className="text-3xl font-bold font-accent text-center text-primary">
                                    {localization?.forgot_password}
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    {localization?.verification_email}
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        label={localization?.checkout_email_label}
                                        inputClassName={`
                                        w-full rounded-md border text-lg bg-white px-4 py-2 text-primary transition-all duration-200
                                        focus:border-accent focus:ring-2 focus:ring-accent/25 focus: focus:outline-none
                                        ${error ? "border-error" : "border-divider"}
                                        `}
                                        className="w-full"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Sending code..."
                                        className="mt-2"
                                    >
                                        {localization?.account_status}
                                    </Button>

                                    <p className="text-center text-sm text-text pt-2">
                                        {localization?.password_remember}{" "}
                                        <Link href="/login" className="font-medium text-primary hover:underline">
                                            {localization?.account_signin}
                                        </Link>
                                    </p>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </FaderInAnimation>
    );
}
