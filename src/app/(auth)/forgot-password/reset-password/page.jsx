"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";
import Toast from "@/components/ui/Toast";
import Image from "next/image";
import { getLocalization } from "@/lib/getLocalization";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const [hasToken, setHasToken] = useState(false);
    const [localization, setLocalization] = useState(null);

    useEffect(() => {
        const fetchLocalization = async () => {
            const data = await getLocalization();
            setLocalization(data);
        };
        fetchLocalization();
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("reset_token");
        if (!token) {
            router.replace("/login");
        } else {
            setHasToken(true);
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword.trim() || !confirmPassword.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const email = sessionStorage.getItem("reset_email");
            const token = sessionStorage.getItem("reset_token");

            if (!email || !token) {
                throw new Error("Session expired. Please try the forgot password flow again.");
            }

            const response = await apiService.post("/Account/reset-password", {
                email: email,
                token: token,
                newPassword: newPassword
            });

            if (response?.success || response) {
                setToast({
                    show: true,
                    message: "Password reset successful! You can now login.",
                    type: "success"
                });

                // Clear session storage
                sessionStorage.removeItem("reset_email");
                sessionStorage.removeItem("reset_token");

                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (err) {
            setError(err.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!hasToken) {
        return null;
    }

    return (
        <FaderInAnimation direction="up">
            <div className="flex items-center justify-center p-4 bg-secondary mt-10 h-screen">
                {/* Outer frame */}
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

                        {/* LEFT: Image panel */}
                        <div className="relative hidden lg:block">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('/images/new/forget page copy.webp')" }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-black/75" />

                            {/* Top brand */}
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

                            {/* Quote block */}
                            <div className="absolute bottom-7 left-7 right-7">
                                <div className="text-white text-2xl font-semibold leading-snug font-accent">
                                    {localization?.password_secure || '"Secure your account with a new password."'}
                                </div>
                                <div className="mt-3 text-white/80 text-sm">
                                    {localization?.recovery_security || "Prolixus Security • Account Recovery"}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Reset Password Form panel */}
                        <div className="flex items-center justify-center p-8 sm:p-12">
                            <div className="w-full max-w-md">

                                {/* Brand (for mobile) */}
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
                                    {localization?.new_password || "Set New Password"}
                                </h1>
                                <p className="mt-2 text-center text-sm text-text">
                                    {localization?.enter_email || "Enter and confirm your new password below."}
                                </p>

                                {error && (
                                    <p className="text-error text-sm text-center mt-4">{error}</p>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        label={localization?.security_new_password || "New Password"}
                                        inputClassName="w-full bg-transparent px-4 py-3 outline-none"
                                        className="w-full"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />

                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        label={localization?.security_confirm_password || "Confirm Password"}
                                        inputClassName="w-full bg-transparent px-4 py-3 outline-none"
                                        className="w-full"
                                        placeholder="Re-enter new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={loading}
                                        loadingText="Updating password..."
                                        className="mt-2 rounded-xl hover:bg-accent/90 transition-all duration-300"
                                    >
                                        {localization?.security_update_success || "Update Password"}
                                    </Button>

                                    <p className="text-center text-sm text-text pt-2">
                                        <Link href="/login" className="font-medium text-accent hover:underline">
                                            {localization?.login_back || "Back to Login"}
                                        </Link>
                                    </p>
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