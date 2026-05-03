"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/app/loading";

import { useAuth } from "@/context/AuthContext";

/**
 * RouteGuard component to protect authenticated-only routes.
 * Redirects to /login?redirect=<currentPath> if no authToken is found.
 */
export default function RouteGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            // Redirect to login with current path as redirect param
            const redirectPath = encodeURIComponent(pathname);
            router.replace(`/login?redirect=${redirectPath}`);
        }
    }, [isLoggedIn, loading, pathname, router]);

    if (loading || !isLoggedIn) {
        // Display a loading state aligned with the app's loading pattern
        return <Loading />;
    }

    return children;
}
