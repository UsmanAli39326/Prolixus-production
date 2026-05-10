"use client";

import React, { useState, useCallback, useEffect } from "react";
import SecurityForm from "@/components/layout/Dashboard/ProfileSetting/SecurityForm";
import ProfileActions from "@/components/layout/Dashboard/ProfileSetting/ProfileAction";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { apiService } from "@/lib/api";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

const INITIAL_FORM = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

function Toast({ type, message, onClose }) {
    const isSuccess = type === "success";
    return (
        <div
            role="alert"
            className={`
                flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg border mb-8
                ${isSuccess
                    ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                    : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300"
                }
                animate-fade-in
            `}
        >
            {isSuccess
                ? <MdCheckCircle className="text-xl shrink-0 mt-0.5 text-green-500" />
                : <MdError className="text-xl shrink-0 mt-0.5 text-red-500" />
            }
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss"
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
                <MdClose className="text-lg" />
            </button>
        </div>
    );
}

export default function SecuritySettingsPage({ localization }) {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    const dismissToast = useCallback(() => setToast(null), []);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(dismissToast, 5000);
        return () => clearTimeout(t);
    }, [toast, dismissToast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleCancel = () => {
        dismissToast();
        setFormData(INITIAL_FORM);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dismissToast();

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors({ confirmPassword: localization?.security_password_mismatch || "Passwords do not match." });
            return;
        }

        if (formData.newPassword.length < 8) {
            setToast({
                type: "error",
                message: localization?.security_password_length || "New password must be at least 8 characters long.",
            });
            return;
        }

        setIsSaving(true);

        try {
            const response = await apiService.post("/Account/change-password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            if (!response?.success && response !== true) {
                // Adjust based on your actual API response structure (e.g., if response is just standard fetch output)
                throw new Error(response?.message || response?.error || "Failed to update password.");
            }

            setToast({
                type: "success",
                message: localization?.security_update_success,
            });

            setFormData(INITIAL_FORM);
        } catch (err) {
            setToast({
                type: "error",
                message: `${localization?.security_update_error} ${err.message}`,
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {toast && (
                <FaderInAnimation direction="up">
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={dismissToast}
                    />
                </FaderInAnimation>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <FaderInAnimation direction="up" delay={0.4}>
                    <SecurityForm
                        formData={formData}
                        onChange={handleChange}
                        errors={errors}
                        isLoading={isSaving}
                        localization={localization}
                    />
                </FaderInAnimation>

                <hr className="border-divider" />

                <FaderInAnimation direction="up" delay={0.6}>
                    <ProfileActions
                        isLoading={isSaving}
                        onCancel={handleCancel}
                        localization={localization}
                    />
                </FaderInAnimation>
            </form>
        </div>
    );
}
