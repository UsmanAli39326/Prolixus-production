"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getCountries } from "@/app/api/products/countries";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutForm({ nextStep, goToStep, formData, updateFormData, isAuthenticated, total, onDirectComplete, isSubmitting, isSubscription, localization }) {
    const { t } = useLanguage();
    const [errors, setErrors] = useState({});

    const inputStyles = {
        labelClassName: "text-sm font-medium ml-2 text-primary font-accent",
        inputClassName: "w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-default"
    };

    const [countries, setCountries] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountries();
                setCountries(data);
                if (formData.countryId && !formData.countryCode && data.length > 0) {
                    const match = data.find(c => String(c.id) === String(formData.countryId));
                    if (match) {
                        updateFormData({ countryCode: match.code || "" });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            } finally {
                setIsLoadingCountries(false);
            }
        };
        fetchCountries();
    }, [formData.countryId, formData.countryCode, updateFormData]);

    const validate = () => {
        const newErrors = {};
        const isReq = localization?.checkout_field_required || t("checkout_field_required", "is required");
        if (!formData.email) newErrors.email = `${localization?.checkout_email_label || t("checkout_email_label", "Email")} ${isReq}`;
        if (!formData.fullName) newErrors.fullName = `${localization?.checkout_fullname_label || t("checkout_fullname_label", "Full Name")} ${isReq}`;
        if (!formData.phone) newErrors.phone = `${localization?.checkout_phone_label || t("checkout_phone_label", "Phone")} ${isReq}`;
        if (!formData.address) newErrors.address = `${localization?.checkout_street_label || t("checkout_street_label", "Address")} ${isReq}`;
        if (!formData.city) newErrors.city = `${localization?.checkout_city_label || t("checkout_city_label", "City")} ${isReq}`;
        if (!formData.zip) newErrors.zip = `${localization?.checkout_zip_label || t("checkout_zip_label", "ZIP / Postal Code")} ${isReq}`;
        if (formData.countryCode === "US" && !formData.state) {
            newErrors.state = localization?.checkout_state_required || t("checkout_state_required", "State is required for United States shipping");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            if (total === 0) {
                onDirectComplete();
            } else {
                nextStep();
            }
        }
    };

    // INPUT HANDLERS: Generic change handler that maps directly to the global checkout state.
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "countryId") {
            const selectedCountry = countries.find(c => String(c.id) === String(value));
            updateFormData({
                countryId: value,
                countryCode: selectedCountry?.code || ""
            });
        } else {
            updateFormData({ [name]: type === 'checkbox' ? checked : value });
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="left">
                <nav className="flex items-center gap-3 text-sm font-medium font-default">
                    <span className="text-primary font-bold">{localization?.checkout_breadcrumb_info}</span>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <span className="text-gray-400 cursor-default">{localization?.checkout_breadcrumb_payment}</span>
                </nav>
            </RevealInAnimation>

            {isSubscription && (
                <RevealInAnimation direction="right">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent/5 border border-accent/20">
                        <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <svg className="size-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary">
                                {localization?.checkout_subscription_notice_title || "You're setting up a subscription"}
                            </p>
                            <p className="text-xs text-text/60 font-accent">
                                {localization?.checkout_subscription_notice_desc || "You'll be billed monthly. Cancel anytime from your dashboard."}
                            </p>
                        </div>
                    </div>
                </RevealInAnimation>
            )}

            <div className="space-y-10">
                {/* Contact Section */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
                            <h2 className="text-2xl font-bold tracking-tight text-primary">{localization?.checkout_contact_info_title}</h2>
                            {!isAuthenticated && (
                                <span className="text-sm font-accent text-gray-500">
                                    {localization?.checkout_login_prompt} <Link href="/login?redirect=/checkout" className="text-accent font-bold hover:underline hover:cursor-pointer">{localization?.checkout_login_link}</Link>
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="md:col-span-2">
                                <Input
                                    label={localization?.checkout_email_label}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    placeholder="you@example.com"
                                    type="email"
                                    className="space-y-1.5"
                                    required
                                    readOnly={isAuthenticated}
                                    {...inputStyles}
                                />
                            </div>
                            <Input
                                label={localization?.checkout_fullname_label}
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={errors.fullName}
                                placeholder="e.g. Jane Doe"
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <Input
                                label={localization?.checkout_phone_label}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                placeholder="+1 (555) 000-0000"
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Shipping Address */}
                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">{localization?.checkout_shipping_address_title}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="md:col-span-2">
                                <Input
                                    label={localization?.checkout_street_label}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                    placeholder="Street name and number"
                                    className="space-y-1.5"
                                    required
                                    {...inputStyles}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Input
                                    label={localization?.checkout_apartment_label}
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    className="space-y-1.5"
                                    {...inputStyles}
                                />
                            </div>
                            <Input
                                label={localization?.checkout_zip_label}
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                error={errors.zip}
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <Input
                                label={localization?.checkout_city_label}
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                error={errors.city}
                                className="space-y-1.5"
                                required
                                {...inputStyles}
                            />
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium ml-2 text-primary font-accent block mb-1.5">{localization?.checkout_country_label}</label>
                                <select
                                    name="countryId"
                                    className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-white/5 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                                    value={formData.countryId}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>{localization?.checkout_select_country}</option>
                                    {isLoadingCountries ? (
                                        <option disabled>{localization?.checkout_loading_countries}</option>
                                    ) : (
                                        countries.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                            {formData.countryCode === "US" && (
                                <div className="md:col-span-2">
                                    <Input
                                        label={localization?.checkout_state_label || "State"}
                                        name="state"
                                        value={formData.state || ""}
                                        onChange={handleChange}
                                        error={errors.state}
                                        placeholder="e.g. CA"
                                        className="space-y-1.5"
                                        required
                                        {...inputStyles}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </FaderInAnimation>

                {/* Actions */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100 dark:border-white/10">
                        <Link
                            href="/cart"
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors group"
                        >
                            <HiChevronLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                            {localization?.checkout_return_to_cart}
                        </Link>

                        <Button
                            onClick={handleNext}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto h-14 bg-accent! hover:bg-accent! text-white! font-bold text-lg rounded-full! shadow-lg shadow-accent/10 px-10"
                        >
                            {total === 0
                                ? localization?.checkout_complete_order
                                : isSubscription
                                    ? (localization?.checkout_continue_to_payment_setup || 'Continue to Payment Setup')
                                    : localization?.checkout_continue_to_payment
                            }
                        </Button>
                    </div>
                </FaderInAnimation>
            </div>
        </div>
    );
}
