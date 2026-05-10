"use client";
import React from "react";
import Input from "@/components/ui/Input";
import { MdLock } from "react-icons/md";

export default function SecurityForm({ formData = {}, onChange, errors = {}, isLoading, localization }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-accent font-bold text-primary mb-2">
                        {localization?.security_title}
                    </h3>
                    <p className="text-base text-text/70">
                        {localization?.security_desc}
                    </p>
                </div>
                <button
                    type="button"
                    className="text-sm font-medium text-accent hover:underline"
                >
                    {localization?.security_forgot_password}
                </button>
            </div>

            <div className="md:col-span-2 md:w-1/2">
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    label={localization?.security_current_password}
                    inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                    type="password"
                    placeholder={localization?.security_password_placeholder}
                    autoComplete="current-password"
                    icon={<MdLock />}
                    value={formData.currentPassword ?? ""}
                    onChange={onChange}
                    disabled={isLoading}
                    required
                />
            </div>

            <Input
                id="newPassword"
                name="newPassword"
                label={localization?.security_new_password}
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                type="password"
                placeholder={localization?.security_password_placeholder}
                autoComplete="new-password"
                icon={<MdLock />}
                value={formData.newPassword ?? ""}
                onChange={onChange}
                disabled={isLoading}
                required
            />

            <Input
                id="confirmPassword"
                name="confirmPassword"
                label={localization?.security_confirm_password}
                inputClassName={`w-full border rounded-md px-4 py-2 focus:ring-0 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
                type="password"
                placeholder={localization?.security_password_placeholder}
                autoComplete="new-password"
                icon={<MdLock className="text-xl" />}
                value={formData.confirmPassword ?? ""}
                onChange={onChange}
                disabled={isLoading}
                required
            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
        </div>
    );
}