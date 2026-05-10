"use client";
import React from "react";
import Input from "@/components/ui/Input";
import { FaUser, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaGlobe, FaCity, FaRoad } from "react-icons/fa";

export default function PersonalInfoForm({ formData = {}, onChange, isLoading, countries = [], isLoadingCountries = false, localization }) {
    const inputClass =
        "w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section header */}
            <div className="md:col-span-2">
                <h3 className="text-xl font-accent font-bold text-primary mb-2">
                    {localization?.profile_personal_info}
                </h3>
                <p className="text-base text-text/70">
                    {localization?.profile_personal_info_desc}
                </p>
            </div>

            {/* Full Name */}
            <Input
                id="name"
                name="name"
                label={localization?.checkout_fullname_label}
                placeholder={localization?.profile_full_name_placeholder}
                inputClassName={inputClass}
                value={formData.name ?? ""}
                onChange={onChange}
                disabled={isLoading}
                required
                autoComplete="name"
                icon={<FaUser />}
            />

            {/* Email Address */}
            <Input
                id="email"
                name="email"
                label={localization?.checkout_email_label}
                type="email"
                placeholder="email@example.com"
                inputClassName={inputClass}
                value={formData.email ?? ""}
                disabled={true}
                readOnly
                icon={<FaEnvelope />}
            />

            {/* Phone Number */}
            <Input
                id="mobile"
                name="mobile"
                label={localization?.checkout_phone_label}
                type="tel"
                placeholder="+1 (555) 123-4567"
                inputClassName={inputClass}
                value={formData.mobile ?? ""}
                onChange={onChange}
                disabled={isLoading}
                autoComplete="tel"
                icon={<FaPhone />}
            />

            {/* VAT Number */}
            <Input
                id="vatNumber"
                name="vatNumber"
                label={localization?.cart_vat}
                placeholder={localization?.cart_vat}
                inputClassName={inputClass}
                value={formData.vatNumber ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaBuilding />}
            />

            {/* Shipping Post Code */}
            <Input
                id="shippingPostCode"
                name="shippingPostCode"
                label={localization?.checkout_zip_label}
                placeholder="Post Code"
                inputClassName={inputClass}
                value={formData.shippingPostCode ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaMapMarkerAlt />}
            />

            {/* Shipping Country */}
            <div className="input-field">
                <label htmlFor="shippingCountryId" className="input-label">
                    {localization?.checkout_country_label}
                </label>
                <div className={`flex justify-center items-center input-wrapper ${isLoading || isLoadingCountries ? "input-disabled" : ""}`}>
                    <span className="input-icon left">
                        <FaGlobe />
                    </span>
                    <select
                        id="shippingCountryId"
                        name="shippingCountryId"
                        className={`input-element ${inputClass} appearance-none bg-transparent`}
                        value={formData.shippingCountryId ?? ""}
                        onChange={onChange}
                        disabled={isLoading || isLoadingCountries}
                    >
                        {isLoadingCountries ? (
                            <option disabled value="">{localization?.checkout_loading_countries}</option>
                        ) : (
                            <>
                                <option disabled value="">{localization?.checkout_select_country}</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Shipping City */}
            <Input
                id="shippingCity"
                name="shippingCity"
                label={localization?.checkout_city_label}
                placeholder="City"
                inputClassName={inputClass}
                value={formData.shippingCity ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaCity />}
            />

            {/* Shipping Street */}
            <Input
                id="shippingStreet"
                name="shippingStreet"
                label={localization?.checkout_street_label}
                placeholder="Street Address"
                inputClassName={inputClass}
                value={formData.shippingStreet ?? ""}
                onChange={onChange}
                disabled={isLoading}
                icon={<FaRoad />}
            />
        </div>
    );
}