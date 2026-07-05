"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaHandshake, FaHome, FaShoppingBag, FaSignOutAlt, FaTimes, FaUser, FaUserAlt, FaCreditCard } from "react-icons/fa";
import { apiService } from "@/lib/api";

import RouteGuard from "@/components/auth/RouteGuard";
import { useAuth } from "@/context/AuthContext";

const getMenuItems = (l) => [
    { label: l?.dashboard_menu_overview, href: '/dashboard', icon: FaHome },
    { label: l?.dashboard_menu_orders, href: '/dashboard/orders', icon: FaShoppingBag },
    { label: l?.dashboard_menu_subscriptions || 'Subscriptions', href: '/dashboard/subscriptions', icon: FaCreditCard },
    { label: l?.dashboard_menu_profile, href: '/dashboard/profile', icon: FaUser },
    { label: l?.dashboard_menu_partner, href: '/dashboard/partner', icon: FaHandshake },
];

export default function DashboardLayout({ children, localization }) {
    const menuItems = getMenuItems(localization);
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout: authLogout, profile, profileLoading } = useAuth();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await apiService.post("/Account/Logout");
        } catch (error) {
            console.error("Logout API failed or returned an error", error);
        } finally {
            authLogout(true); // Use AuthContext logout to keep state in sync
            router.push("/login");
        }
    };

    // Derive display values from preloaded profile
    const displayName = profile?.name;
    const displayEmail = profile?.email;

    return (
        <RouteGuard>
            <div className="bg-secondary dark:bg-background-dark text-text dark:text-slate-100 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
                {/* Mobile Header */}
                {/* Mobile Dashboard Sub-Header */}
                <header className="md:hidden bg-white/10 backdrop-blur-md text-primary dark:text-white p-3 flex items-center justify-between sticky mt-20 z-40 border-b border-divider">
                    <span className="text-sm font-bold uppercase tracking-wider ml-2">{localization?.dashboard_menu_label}</span>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-2xl focus:outline-none bg-primary text-white rounded-lg "
                        aria-label={localization?.dashboard_menu_toggle}
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </header>

                {/* Backdrop for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-primary text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:h-[calc(100vh-80px)] md:sticky md:top-[80px]
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="p-6 md:p-8 flex flex-col gap-10 overflow-y-auto">


                        {/* Navigation Menu */}
                        <nav className="flex flex-col gap-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${isActive
                                            ? 'bg-white/10 text-white border-l-4 border-accent'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                            }`}
                                        href={item.href}
                                    >
                                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform flex items-center justify-center size-5">
                                            <item.icon />
                                        </span>
                                        <span className="text-sm font-medium font-default tracking-wide">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* User & Logout */}
                    <div className="p-6 md:p-8 border-t border-white/10 bg-primary sticky bottom-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="size-10 rounded-full bg-white/90 text-primary border-2 border-accent flex justify-center items-center">
                                <FaUserAlt className='text-xl' />
                            </div>
                            {profileLoading ? (
                                <div className="flex flex-col gap-2">
                                    <div className="h-3 w-24 rounded-full bg-white/20 animate-pulse" />
                                    <div className="h-2.5 w-32 rounded-full bg-white/10 animate-pulse" />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-bold text-white truncate max-w-[150px]">{displayName}</p>
                                    <p className="text-xs text-white/50 truncate max-w-[150px]">{displayEmail}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                            <span className="material-symbols-outlined text-lg flex items-center justify-center"><FaSignOutAlt /></span>
                            {localization?.dashboard_logout}
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-12 lg:px-20 overflow-y-auto h-[calc(100vh-80px)] bg-secondary dark:bg-background-dark lg:mt-20">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </RouteGuard>
    );
}