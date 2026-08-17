"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // Default to English
    const [translations, setTranslations] = useState({});
    const [apiTranslations, setApiTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadTranslations = async (lang) => {
        try {
            const res = await fetch(`/api/translations?lang=${lang}`, { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                setTranslations(data || {});
            } else {
                throw new Error("Failed to fetch translations");
            }
        } catch (error) {
            // Fallback: try dynamic import if fetch route isn't available
            try {
                const common = await import(`@/i18n/${lang}/common.json`);
                setTranslations(common.default || {});
            } catch (importError) {
                console.error("Failed to load local translations:", importError);
            }
        }

        try {
            const response = await apiService.get(`/StaticLocalization?culture=${lang}&lang=${lang}&language=${lang}`);
            if (response && response.success && Array.isArray(response.data)) {
                const map = response.data.reduce((acc, item) => {
                    if (item.key) {
                        acc[item.key.toLowerCase()] = item.value;
                    }
                    return acc;
                }, {});
                setApiTranslations(map);
            } else if (response?.data && typeof response.data === 'object') {
                setApiTranslations(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch static localization API:", error);
        }
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await apiService.get("/Configuration/languages");
                if (response.success) {
                    setAvailableLanguages(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch languages:", error);
                // Fallback to basic languages if API fails
                setAvailableLanguages([
                    { code: "en", name: "English", isRtl: false, isActive: true },
                    { code: "de", name: "German", isRtl: false, isActive: true }
                ]);
            }
        };

        fetchLanguages();

        // Load language preference from localStorage on mount
        const storedLang = localStorage.getItem("appLanguage");
        const langToUse = (storedLang && (storedLang === "en" || storedLang === "de" || storedLang === "ar"))
            ? storedLang
            : (navigator.language.split('-')[0] === "de" ? "de" : (navigator.language.split('-')[0] === "ar" ? "ar" : "en"));

        setLanguage(langToUse);
        loadTranslations(langToUse).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Update document lang and dir attribute when language changes
        if (!loading) {
            document.documentElement.lang = language;

            // Set RTL/LTR direction based on language configuration
            const currentLangData = availableLanguages.find(l => l.code === language);
            if (currentLangData) {
                document.documentElement.dir = currentLangData.isRtl ? "rtl" : "ltr";
            }

            localStorage.setItem("appLanguage", language);
            document.cookie = `appLanguage=${language}; path=/; max-age=31536000; SameSite=Lax`;
            loadTranslations(language);
        }
    }, [language, loading, availableLanguages]);

    const switchLanguage = (newLang) => {
        if (newLang !== language) {
            // Persist language choice immediately before reload
            localStorage.setItem("appLanguage", newLang);
            document.cookie = `appLanguage=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

            // Trigger a full page reload to ensure all content and state are updated
            window.location.reload();
        }
    };

    /**
     * Translate function
     * Usage: t('navbar_welcome', 'Welcome') or t('navbar.shop_now')
     */
    const t = (path, fallback) => {
        if (!path) return fallback || "";

        // 1. Direct lookup in static localization API map (lowercased key)
        const lowerKey = path.toLowerCase();
        if (apiTranslations && apiTranslations[lowerKey] !== undefined && apiTranslations[lowerKey] !== "") {
            return apiTranslations[lowerKey];
        }

        // 2. Nested lookup in local common.json
        const keys = path.split('.');
        let result = translations;
        let found = true;
        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                found = false;
                break;
            }
        }
        if (found && typeof result === "string" && result !== "") {
            return result;
        }

        // 3. Return explicit fallback string if provided, otherwise path key
        return fallback !== undefined ? fallback : path;
    };

    return (
        <LanguageContext.Provider value={{ language, availableLanguages, switchLanguage, t, loc: apiTranslations, loading }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
