"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaChevronDown } from "react-icons/fa6";

// Configuration for flags and short labels based on language code
const languageMeta = {
    en: { label: "EN", flag: "🇺🇸" },
    de: { label: "DE", flag: "🇩🇪" },
    ar: { label: "AR", flag: "🇦🇪" },
};

export default function LanguageSwitcher({ variant = "desktop" }) {
    const { language, availableLanguages, switchLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fallback to hardcoded list if API languages are not yet loaded
    const displayLanguages = availableLanguages.length > 0 ? availableLanguages : [
        { code: "en", name: "English", isActive: true },
        { code: "de", name: "German", isActive: true }
    ];

    const currentLangData = displayLanguages.find((l) => l.code === language) || displayLanguages[0];
    const currentMeta = languageMeta[currentLangData?.code] || { label: currentLangData?.code?.toUpperCase(), flag: "🌐" };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isMobile = variant === "mobile";

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={
                    isMobile
                        ? "flex w-full items-center justify-between border border-accent bg-accent px-4 py-3 text-sm font-bold text-primary transition-all active:scale-[0.98] hover:brightness-110 rounded-xl shadow-lg shadow-accent/20"
                        : "flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
                }
            >
                {isMobile ? (
                    <span>{currentMeta.label}</span>
                ) : (
                    <>
                        <span className="text-base">{currentMeta.flag}</span>
                        <span>{currentMeta.label}</span>
                    </>
                )}
                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <ul
                    className={`absolute z-[60] min-w-[160px] rounded-2xl bg-[#1A2E35] p-2 shadow-2xl ring-1 ring-white/10 animate-in fade-in zoom-in duration-200 ${
                        isMobile
                            ? "bottom-full mb-2 left-0 w-full origin-bottom"
                            : "right-0 mt-2 w-40 origin-top-right"
                    }`}
                >
                    {displayLanguages.filter(lang => lang.isActive !== false).map((lang) => {
                        const meta = languageMeta[lang.code] || { label: lang.code.toUpperCase(), flag: "🌐" };
                        return (
                            <li key={lang.code}>
                                <button
                                    onClick={() => {
                                        switchLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                                        language === lang.code
                                            ? "bg-accent text-white"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    {isMobile ? null : <span className="text-base">{meta.flag}</span>}
                                    <span>{lang.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
