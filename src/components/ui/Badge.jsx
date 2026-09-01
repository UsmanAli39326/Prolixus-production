"use client";

import * as React from "react";
import PropTypes from "prop-types";

/**
 * Badge Component
 * 
 * A small status indicator or label with various styles and optional icons.
 * 
 * @example
 * <Badge variant="success">Shipped</Badge>
 * <Badge variant="warning" dot>Processing</Badge>
 */

const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-200";

const variantStyles = {
    primary: "bg-(--primary-color) text-(--secondary-color) border-(--primary-color) shadow-sm",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error: "bg-red-50 text-red-700 border-red-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    outline: "bg-transparent text-(--text-color) border-(--divider-color)",
};

const dotColors = {
    primary: "bg-(--secondary-color)",
    success: "bg-green-600",
    warning: "bg-amber-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    outline: "bg-(--divider-color)",
};

function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Badge = React.forwardRef(({
    className,
    variant = "primary",
    dot = false,
    icon: Icon,
    animate = false,
    children,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cx(
                baseStyles,
                variantStyles[variant] || variantStyles.primary,
                className
            )}
            {...props}
        >
            {dot && (
                <span className={cx(
                    "size-1.5 rounded-full shrink-0",
                    dotColors[variant] || dotColors.primary,
                    animate && "animate-pulse"
                )} />
            )}
            {Icon && (
                <span className={cx("shrink-0", animate && "animate-spin")}>
                    <Icon className="text-[10px]" />
                </span>
            )}
            {children}
        </span>
    );
});

Badge.displayName = "Badge";

Badge.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "success", "warning", "error", "info", "outline"]),
    dot: PropTypes.bool,
    icon: PropTypes.elementType,
    animate: PropTypes.bool,
    children: PropTypes.node,
};

export default Badge;
export { Badge };   