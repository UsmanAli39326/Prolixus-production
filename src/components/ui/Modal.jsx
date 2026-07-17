"use client"
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Modal.jsx
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title: node
 * - children: node
 * - size: "sm" | "md" | "lg" (default "md")
 * - className: additional className for the panel
 * - initialFocusRef: React ref to focus when opened
 */

const SIZES = {
    xs: "max-width: 340px",
    sm: "max-width: 420px",
    md: "max-width: 720px",
    lg: "max-width: 980px",
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    className = "",
    initialFocusRef,
}) {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    const prevActiveRef = useRef(null);
    const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`);

    useEffect(() => {
        if (!isOpen) return;

        prevActiveRef.current = document.activeElement;

        // lock scroll
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // focus management
        const focusTarget = initialFocusRef?.current ?? panelRef.current;
        if (focusTarget?.focus) {
            // ensure element is focusable
            if (!focusTarget.hasAttribute("tabIndex")) focusTarget.tabIndex = -1;
            focusTarget.focus();
        }

        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
            if (e.key === "Tab") {
                // simple focus trap: cycle inside panel
                const focusable = panelRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onKey);
            // restore focus
            try {
                prevActiveRef.current?.focus?.();
            } catch {}
        };
    }, [isOpen, onClose, initialFocusRef]);

    if (!isOpen) return null;

    const onOverlayMouseDown = (e) => {
        if (e.target === overlayRef.current) onClose?.();
    };

    const panelStyle = `${SIZES[size] || SIZES.md}`;

    return createPortal(
        <div
            ref={overlayRef}
            onMouseDown={onOverlayMouseDown}
            aria-hidden={false}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.45)",
                padding: "20px",
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId.current : undefined}
                ref={panelRef}
                style={{
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    width: "100%",
                    ...(panelStyle ? { maxWidth: panelStyle.replace("max-width: ", "") } : {}),
                    outline: "none",
                }}
                className={className}
            >
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {title ? (
                        <h2 id={titleId.current} style={{ margin: 0, fontSize: 16 }}>
                            {title}
                        </h2>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 6,
                            lineHeight: 0,
                            fontSize: 18,
                        }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ padding: 20 }}>{children}</div>
            </div>
        </div>,
        document.body
    );
}