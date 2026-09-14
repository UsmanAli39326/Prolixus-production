/**
 * Strips HTML tags from a string and returns plain text
 * @param {string} html - HTML string to strip
 * @returns {string} - Plain text without HTML tags
 */
export const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Translates package and variant titles to active language (German, English, Arabic, etc.)
 * @param {string} title - Raw title string
 * @param {Function} [t] - Translation function from useLanguage()
 * @param {string} [language] - Active language code (e.g. 'de', 'en')
 * @returns {string} - Localized package title
 */
export const localizePackageTitle = (title, t, language) => {
    if (!title) return "";
    const lower = title.toLowerCase().trim();
    const isDe = language === "de" || language?.startsWith("de");

    if (lower === "1 month supply" || lower === "monthly supply") {
        return isDe ? "1 Monatsvorrat" : (t ? t("plan_1_month_supply", "1 Month Supply") : "1 Month Supply");
    }
    if (lower === "3 month supply") {
        return isDe ? "3 Monatsvorrat" : (t ? t("plan_3_month_supply", "3 Month Supply") : "3 Month Supply");
    }
    if (lower === "6 month supply" || lower === "6-pack") {
        return isDe ? "6 Monatsvorrat" : (t ? t("plan_6_month_supply", "6 Month Supply") : "6 Month Supply");
    }
    if (lower === "1 bottle") {
        return isDe ? "1 Flasche" : (t ? t("plan_1_bottle", "1 Bottle") : "1 Bottle");
    }
    if (lower === "3 bottles") {
        return isDe ? "3 Flaschen" : (t ? t("plan_3_bottles", "3 Bottles") : "3 Bottles");
    }
    if (lower === "6 bottles") {
        return isDe ? "6 Flaschen" : (t ? t("plan_6_bottles", "6 Bottles") : "6 Bottles");
    }
    if (lower === "monthly subscription") {
        return isDe ? "Monatliches Abonnement" : (t ? t("product_subscription_plan", "Monthly Subscription") : "Monthly Subscription");
    }
    if (lower === "subscription plan") {
        return isDe ? "Abonnement-Plan" : (t ? t("product_subscription_plan", "Subscription Plan") : "Subscription Plan");
    }
    if (lower === "starter pack" || lower === "starterpaket") {
        return isDe ? "Starterpaket" : (t ? t("plan_starter_pack", "Starter Pack") : "Starter Pack");
    }
    if (lower === "standard pack") {
        return isDe ? "Standard-Paket" : (t ? t("plan_standard_pack", "Standard Pack") : "Standard Pack");
    }
    if (lower === "best value pack" || lower === "best value") {
        return isDe ? "Best-Value-Paket" : (t ? t("plan_best_value_pack", "Best Value Pack") : "Best Value Pack");
    }

    if (t) {
        const key = `plan_${lower.replace(/[^a-z0-9]/g, '_')}`;
        const translated = t(key, title);
        if (translated && translated !== key) return translated;
    }
    return title;
};

/**
 * Resolves a consistent display name for a cart or checkout item.
 * Ensures the subscription package title / variant label (e.g. "1 Month Supply", "Monthly Subscription")
 * is preserved and displayed alongside the product name, localized to the current language.
 * 
 * @param {Object} item - Cart or checkout item object
 * @param {Function} [t] - Translation function from useLanguage()
 * @param {string} [language] - Active language code
 * @returns {string} - Formatted product display name
 */
export const getItemDisplayName = (item, t, language) => {
    if (!item) return "";

    const rawVariant = item.variantLabel || item.variant || "";
    const rawTitle = item.title || "";
    const name = item.name || "";

    const variantLabel = localizePackageTitle(rawVariant, t, language);
    const title = localizePackageTitle(rawTitle, t, language);

    // If variantLabel is present and distinct from base product name
    if (variantLabel && name && !name.toLowerCase().includes(variantLabel.toLowerCase())) {
        return `${name} - ${variantLabel}`;
    }

    // If title has package info distinct from base product name
    if (title && name && title !== name && !name.toLowerCase().includes(title.toLowerCase())) {
        return `${name} - ${title}`;
    }

    return name || title || variantLabel || "Product";
};

/**
 * Formats a date string or Date object into a standardized string.
 * @param {string|Date} date - The date to format.
 * @param {'date'|'time'|'datetime'|'year'|'long'} type - The format type.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, type = 'date') => {
    if (!date) return "—";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "—";

    // Standardizing on German locale
    const locale = 'en-US';

    switch (type) {
        case 'date':
            return d.toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }); // DD.MM.YYYY
        case 'time':
            return d.toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit'
            }); // HH:mm
        case 'datetime':
            return d.toLocaleString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }); // DD.MM.YYYY, HH:mm
        case 'year':
            return d.getFullYear().toString(); // YYYY
        case 'long':
            return d.toLocaleString(locale, {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }); // z.B. Donnerstag, 26. Oktober 2023, 10:30
        default:
            return d.toLocaleDateString(locale);
    }
};
