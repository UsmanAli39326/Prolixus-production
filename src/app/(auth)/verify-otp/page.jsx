"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";
import Toast from "@/components/ui/Toast";
import Image from "next/image";
import { getLocalization } from "@/lib/getLocalization";

export default function VerifyOTPPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const type = searchParams.get("type") || "signup"; // 'signup' or 'reset'

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const inputRefs = useRef([]);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const [localization, setLocalization] = useState(null);

    useEffect(() => {
        const fetchLocalization = async () => {
            const data = await getLocalization();
            setLocalization(data);
        };
        fetchLocalization();
    }, []);

    useEffect(() => {
        if (!email) {
            router.replace("/login");
        }
    }, [email, router]);

    // Cooldown timer
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleChange = (index, value) => {
        const digit = value.replace(/[^0-9]/g, "");
        if (digit.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = digit;
            setOtp(newOtp);

            if (digit && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        const digits = text.replace(/\D/g, "").slice(0, 6);
        if (digits) {
            const newOtp = [...otp];
            digits.split("").forEach((ch, i) => {
                if (i < 6) newOtp[i] = ch;
            });
            setOtp(newOtp);
            const lastIndex = Math.min(digits.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter the 6-digit OTP code.");
            return;
        }

        setLoading(true);
        try {
            const endpoint = type === "reset" ? "/Account/verify-reset-otp" : "/Account/verify-email";
            const response = await apiService.post(endpoint, {
                email: email,
                Otp: otpValue
            });

            if (response?.success || response) {
                if (type === "reset") {
                    setToast({
                        show: true,
                        message: "OTP verified! You can now reset your password.",
                        type: "success"
                    });
                    // The API returns a token in the data field
                    const token = response?.data?.token || response?.data || response?.token;
                    const tokenToStore = typeof token === 'object' ? JSON.stringify(token) : String(token);

                    // Store email and token for reset password page
                    sessionStorage.setItem("reset_email", email);
                    sessionStorage.setItem("reset_token", tokenToStore);
                    setTimeout(() => router.push("/forgot-password/reset-password"), 1500);
                } else {
                    setToast({
                        show: true,
                        message: "Account verified! Please login.",
                        type: "success"
                    });
                    setTimeout(() => router.push("/login"), 1500);
                }
            }
        } catch (err) {
            setError(err.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0 || resendLoading) return;

        setResendLoading(true);
        setError("");
        try {
            const endpoint = type === "reset" ? "/Account/forgot-password" : "/Account/resend-verification-otp";
            // Note: For reset, we just call forgot-password again. For signup, we call resend-verification-otp.
            await apiService.post(endpoint, { email });
            
            setToast({
                show: true,
                message: "OTP has been resent to your email.",
                type: "success"
            });
            setCooldown(60);
        } catch (err) {
            setError(err.message || "Failed to resend OTP. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    const maskedEmail = email ? email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + "*".repeat(gp3.length)) : "";

    return (
        <FaderInAnimation direction="up">
            <div className="flex items-center justify-center p-4 bg-secondary mt-10 h-screen">
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
                                    {type === "reset" 
                                        ? (localization?.reset_password || "Reset your password securely.") 
                                        : (localization?.welcome_title || "Verify your email to get started.")}
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    {localization?.code_email || "A 6-digit code has been sent to your email."}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: OTP Form panel */}
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
                                    {localization?.verify_otp || "Verify OTP"}
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    Enter the 6-digit code sent to {maskedEmail}
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8">
                                    <div className="flex items-center justify-center gap-3">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                className={`
                                                    w-12 h-14 sm:w-14 sm:h-16 rounded-xl border text-center text-lg font-semibold
                                                    bg-white text-primary transition-all duration-200
                                                    focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none
                                                    ${error ? "border-error" : "border-divider"}
                                                `}
                                            />
                                        ))}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Verifying..."
                                        className="mt-8"
                                    >
                                        {localization?.account_status || "Verify & Continue"}
                                    </Button>

                                    <div className="mt-4 text-center text-sm text-text">
                                        {localization?.account_receive_code || "Didn't receive code?"}{" "}
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            disabled={cooldown > 0 || resendLoading}
                                            className={`font-medium text-accent hover:underline ${cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {resendLoading ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : (localization?.account_status_resend || "Resend")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Toast
                    show={toast.show}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast((prev) => ({ ...prev, show: false }))}
                />
            </div>
        </FaderInAnimation>
    );
}
