"use client";

import React, { useState, useEffect, useCallback } from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

import PersonalInfoForm from "@/components/layout/Dashboard/ProfileSetting/PersonalInfoForm";
import ProfileActions from "@/components/layout/Dashboard/ProfileSetting/ProfileAction";

import { getProfile, updateProfile } from "@/lib/ProfileService";
import { getCountries } from "@/app/api/products/countries";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

/* ─── Initial empty state matching the API shape ─── */
const INITIAL_FORM = {
    name: "",
    email: "",
    mobile: "",
    vatNumber: "",
    shippingPostCode: "",
    shippingCountryId: "",
    shippingCity: "",
    shippingStreet: "",
};

/* ─── Small inline toast component ─── */
function Toast({ type, message, onClose }) {
    const isSuccess = type === "success";
    return (
        <div
            role="alert"
            className={`
                flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg border
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

/* ─── Page ─── */
export default function ProfileSettingsPage({ localization }) {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isFetching, setIsFetching] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

    const [countries, setCountries] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);

    /* ── Dismiss toast helper ── */
    const dismissToast = useCallback(() => setToast(null), []);

    /* ── Auto-dismiss after 5 s ── */
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(dismissToast, 5000);
        return () => clearTimeout(t);
    }, [toast, dismissToast]);

    /* ── GET profile on mount ── */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await getProfile().then((res) => res.data);
                if (!cancelled) {
                    setFormData({
                        name: data.name ?? "",
                        email: data.email ?? "",
                        mobile: data.mobile ?? "",
                        vatNumber: data.vatNumber ?? "",
                        shippingPostCode: data.shippingPostCode ?? "",
                        shippingCountryId: data.shippingCountryId ?? "",
                        shippingCity: data.shippingCity ?? "",
                        shippingStreet: data.shippingStreet ?? "",
                    });
                }
            } catch (err) {
                if (!cancelled) {
                    setToast({
                        type: "error",
                        message: `${localization?.profile_load_error} ${err.message}`,
                    });
                }
            } finally {
                if (!cancelled) setIsFetching(false);
            }
        })();

        // Also fetch countries
        (async () => {
            try {
                const data = await getCountries();
                if (!cancelled) setCountries(data);
            } catch (err) {
                console.error("Failed to load countries:", err);
            } finally {
                if (!cancelled) setIsLoadingCountries(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    /* ── Generic field change handler ── */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /* ── Reset to last saved values (Cancel) ── */
    const handleCancel = async () => {
        dismissToast();
        setIsFetching(true);
        try {
            const data = await getProfile();
            setFormData({
                name: data.name ?? "",
                email: data.email ?? "",
                mobile: data.mobile ?? "",
                vatNumber: data.vatNumber ?? "",
                shippingPostCode: data.shippingPostCode ?? "",
                shippingCountryId: data.shippingCountryId ?? "",
                shippingCity: data.shippingCity ?? "",
                shippingStreet: data.shippingStreet ?? "",
            });
        } catch {
            // silently ignore, the user still has their local edits
        } finally {
            setIsFetching(false);
        }
    };

    /* ── PUT on Save ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        dismissToast();
        setIsSaving(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            vatNumber: formData.vatNumber,
            shippingPostCode: formData.shippingPostCode,
            shippingCountryId: Number(formData.shippingCountryId),
            shippingCity: formData.shippingCity,
            shippingStreet: formData.shippingStreet,
        };

        try {
            await updateProfile(payload);
            setToast({
                type: "success",
                message: localization?.profile_update_success,
            });
        } catch (err) {
            setToast({
                type: "error",
                message: `${localization?.profile_update_error} ${err.message}`,
            });
        } finally {
            setIsSaving(false);
        }
    };



    return (
        <div className="flex flex-col gap-8">
            {/* Toast notification */}
            {toast && (
                <FaderInAnimation direction="up">
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={dismissToast}
                    />
                </FaderInAnimation>
            )}

            <div className="flex flex-col gap-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <FaderInAnimation direction="up" delay={0.4}>
                        {/* Personal / shipping info – controlled via API data */}
                        <PersonalInfoForm
                            formData={formData}
                            onChange={handleChange}
                            isLoading={isFetching}
                            countries={countries}
                            isLoadingCountries={isLoadingCountries}
                            localization={localization}
                        />
                    </FaderInAnimation>

                    <hr className="border-divider" />

                    <FaderInAnimation direction="up" delay={0.8}>
                        <ProfileActions
                            isLoading={isSaving}
                            onCancel={handleCancel}
                            localization={localization}
                        />
                    </FaderInAnimation>
                </form>
            </div>
        </div>
    );
}