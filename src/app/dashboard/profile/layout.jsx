"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardHeader from "@/components/layout/Dashboard/DashboardHeader";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { FaUser, FaShieldAlt, FaAddressBook } from "react-icons/fa";
import { getLocalization } from "@/lib/getLocalization";


export default function ProfileLayout({ children }) {
    const pathname = usePathname();
    const [localization, setLocalization] = React.useState(null);

    React.useEffect(() => {
        const fetchLocalization = async () => {
            const data = await getLocalization();
            setLocalization(data);
        };
        fetchLocalization();
    }, []);

    const tabs = [
        {
            name: localization?.profile_personal_info || "Personal Info",
            href: "/dashboard/profile",
            icon: <FaUser className="text-xl" />,
            exact: true,
        },
        {
            name: localization?.security_title || "Security",
            href: "/dashboard/profile/security",
            icon: <FaShieldAlt className="text-xl" />,
        },
    ];

    return (
        <div className="flex flex-col gap-8 pb-10">
            <RevealInAnimation direction="up">
                <DashboardHeader
                    title={localization?.dashboard_menu_profile}
                    subtitle={localization?.profile_settings_subtitle}
                />
            </RevealInAnimation>

            {/* Navigation Tabs */}
            <RevealInAnimation direction="up" delay={0.2}>
                <div className="flex overflow-x-auto border-b border-divider gap-8 mb-4">
                    {tabs.map((tab) => {
                        const isActive = tab.exact
                            ? pathname === tab.href
                            : pathname.startsWith(tab.href);

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`
                                    flex items-center gap-2 pb-3 pt-1 px-1 font-medium whitespace-nowrap
                                    transition-colors relative
                                    ${isActive
                                        ? "text-primary dark:text-primary-light"
                                        : "text-text/60 hover:text-text"
                                    }
                                `}
                            >
                                {tab.icon}
                                {tab.name}

                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary dark:bg-primary-light rounded-t-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </RevealInAnimation>

            <div className="mt-4">
                {children}
            </div>
        </div>
    );
}